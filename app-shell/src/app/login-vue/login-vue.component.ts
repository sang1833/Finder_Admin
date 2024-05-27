import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

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

  constructor(readonly appService: AppService) {}

  async ngAfterViewInit() {
    loadRemoteModule(this.LoginVueModule).then((module) => {
      this.loader = module.default;
    });
  }

  logout() {
    window.location.reload();
  }
}
