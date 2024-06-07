import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class ManageUserAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  userModule = {
    remoteEntry: 'http://localhost:6006/remoteEntry.js',
    remoteName: 'managerUser_app',
    exposedModule: 'ManageUserAppLoader',
  };

  constructor(readonly appService: AppService) {}

  async ngAfterViewInit() {
    loadRemoteModule(this.userModule).then((module) => {
      this.loader = module.default;
    });
  }

  logout() {
    window.location.reload();
  }
}
