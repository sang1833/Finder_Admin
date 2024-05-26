import { Component } from '@angular/core';
import logo from '../assets/angular.png'
import avatar from '../assets/avatar.png'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myLogo = logo
  myAvatar = avatar
}
