import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService, AuthService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-vue',
  templateUrl: './login-vue.component.html',
  styleUrls: ['./login-vue.component.scss'],
})
export class LoginVueAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  LoginVueModule = {
    remoteEntry: 'http://localhost:6002/remoteEntry.js',
    remoteName: 'login_vue_app',
    exposedModule: 'LoginVueAppLoader',
  };

  constructor(
    readonly appService: AppService,
    private readonly authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      // redirect to path dashboard
      console.log('redirect to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }

  async ngAfterViewInit() {
    loadRemoteModule(this.LoginVueModule).then((module) => {
      this.loader = module.default;
    });
  }

  logout() {
    window.location.reload();
  }
}
