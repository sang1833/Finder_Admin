import { Component, QueryList, ViewChildren } from '@angular/core';
import { SidebarService } from '../app.service';

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  title = 'Finder_Admin';

  constructor(readonly sidebarService: SidebarService) {}
}
