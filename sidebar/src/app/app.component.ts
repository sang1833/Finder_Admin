import { Component } from '@angular/core';
import logo from '../assets/angular.png';
import avatar from '../assets/avatar.png';
import mainLogo from '../assets/mainLogo.png';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myLogo = logo;
  myAvatar = avatar;
  mainLogo = mainLogo;
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
