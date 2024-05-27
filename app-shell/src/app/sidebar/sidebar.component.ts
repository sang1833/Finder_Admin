import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidebarService } from '../app.service';
import { filter } from 'rxjs/operators';

declare var require: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;

  avatar = require('@/assets/avatar.png');
  mainLogo = require('@/assets/mainLogo.png');
  isSidebarOpen = false;
  currentRoute: string = '';

  constructor(readonly sidebarService: SidebarService, private router: Router) {
    // Log the initial URL
    this.currentRoute = this.router.url;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Log the current URL whenever a NavigationEnd event occurs
        this.currentRoute = event.url.substring(1);
        // this.currentRoute = event.urlAfterRedirects.substring(1);
      });
    console.log('route', this.currentRoute);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
