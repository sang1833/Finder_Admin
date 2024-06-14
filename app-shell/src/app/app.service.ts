import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

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
  user = localStorage.getItem('user');

  // check if the user is logged in by checking the user in localStorage
  isLoggedIn(): boolean {
    return !!this.user;
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @Injectable({
//   providedIn: 'root',
// })
// export class CheckTokenService {
//   private apiUrl = 'http://localhost:5001/api/v1/auths/';

//   constructor(private http: HttpClient) {}

//   refreshToken() {
//     return this.http.post(this.apiUrl + 'refreshtoken', {}, httpOptions);
//   }

//   checkAndRefreshToken(): Observable<any> {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user || !user.refreshToken) return new Observable();

//     const now = new Date();
//     const refreshTokenExpirationDate = new Date(user.refreshTokenExpired);

//     // Check if the refreshToken has expired
//     if (now > refreshTokenExpirationDate) {
//       return this.http.post(
//         `${this.apiUrl}refreshToken/${user.refreshToken}`,
//         {}
//       );
//     } else return new Observable();
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class CheckTokenService {
  private refreshTokenEndpoint = 'refreshToken';
  private apiUrl = 'http://localhost:5001/api/v1/auths';

  constructor(private http: HttpClient) {}

  checkTokenExpiration(): Observable<boolean> {
    const accessTokenExpired = localStorage.getItem('accessTokenExpired');
    const currentDate = new Date();
    if (
      accessTokenExpired &&
      currentDate.getTime() === new Date(accessTokenExpired).getTime()
    ) {
      return this.refreshAccessToken().pipe(
        catchError((error) => {
          console.error('Error refreshing access token:', error);
          return throwError(error);
        })
      );
    }
    return of(true); // No need to refresh token
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('accessTokenExpired');
    return this.http
      .post<any>(
        `${this.apiUrl}/${this.refreshTokenEndpoint}/${refreshToken}`,
        {}
      )
      .pipe(
        tap((response) => {
          console.log('Access token refreshed:', response.data.accesToken);
          localStorage.setItem('accessToken', response.data.accesToken);
          localStorage.setItem('accessTokenExpired', response.data.accesToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem(
            'refreshTokenExpired',
            response.data.refreshTokenExpired
          );
        })
      );
  }
}
