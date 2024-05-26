import { Component } from '@angular/core';
import { SidebarService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'viblo-module-federation';

  constructor(readonly sidebarService: SidebarService) {}
}
