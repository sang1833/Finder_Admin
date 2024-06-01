import { Component } from '@angular/core';
import logo from '../assets/angular.png';
import manAvatar from '../assets/manAvatar.jpeg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myLogo = logo;
  myAvatar = manAvatar;

  logOut() {
    // if localstorage have item user, it will call api http://localhost:5001/api/v1/auths/logout
    // then remove item user from localstorage
    // and redirect to login page
    // else redirect to login page
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      if (!user) return console.log('No user found');
      fetch('http://localhost:5001/api/v1/auths/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          localStorage.removeItem('user');
          window.location.href = '/login';
        })
        .catch((err) => {
          console.log('Error in header remote', err);
          localStorage.removeItem('user');
          window.location.href = '/login';
        });
    } else {
      window.location.href = '/login';
    }
  }
}
