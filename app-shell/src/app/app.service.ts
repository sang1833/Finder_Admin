import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isSidebarOpen = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this._isSidebarOpen.asObservable();

  toggleSidebar() {
    this._isSidebarOpen.next(!this._isSidebarOpen.value);
  }
}

const users = [
  {
    username: 'user1',
    password: 'user1',
  },
  {
    username: 'user2',
    password: 'user2',
  },
  {
    username: 'user3',
    password: 'user3',
  },
];

const remoteModules = [
  {
    remoteEntry: 'http://localhost:3000/remoteEntry.js',
    remoteName: 'vue_app',
    exposedModule: 'VueAppLoader',
  },
  {
    remoteEntry: 'http://localhost:3001/remoteEntry.js',
    remoteName: 'angular_app',
    exposedModule: 'AngularAppLoader',
  },
  {
    remoteEntry: 'http://localhost:3002/remoteEntry.js',
    remoteName: 'react_app',
    exposedModule: 'ReactAppLoader',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AppService {
  loggedUser: { username: string; password: string } | null = null;
  authorized_modules: typeof remoteModules = [];

  login(username: string, password: string) {
    const user = users.find(
      (item) => item.username === username && item.password === password
    );

    if (!user) return false;

    this.loggedUser = user;

    switch (user.username) {
      case 'user3': {
        this.authorized_modules = remoteModules; // all modules
        break;
      }
      case 'user2': {
        this.authorized_modules = remoteModules.slice(0, 2); // takes first 2
        break;
      }
      default: {
        this.authorized_modules = [remoteModules[0]]; // take first
      }
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // check if the user is logged in by checking the user in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}

@Injectable({
  providedIn: 'root',
})
export class CheckTokenService {
  private apiUrl = 'http://localhost:5001/api/v1/auths/';

  constructor(private http: HttpClient) {}

  checkAndRefreshToken(): void {
    const userItem = localStorage.getItem('user');
    if (!userItem) return;

    const user = JSON.parse(userItem);
    if (!user || !user.refreshToken) return;

    const now = new Date();
    const refreshTokenExpirationDate = new Date(user.refreshTokenExpired);

    // Check if the refreshToken has expired
    if (now > refreshTokenExpirationDate) {
      this.http
        .get(`${this.apiUrl}refreshToken/${user.refreshToken}`)
        .subscribe(
          (response: any) => {
            console.log('Token refreshed successfully');
            localStorage.setItem('user', JSON.stringify(response.data.data));
          },
          (error) => {
            console.error('Error refreshing token:', error);
          }
        );
    }
  }
}
