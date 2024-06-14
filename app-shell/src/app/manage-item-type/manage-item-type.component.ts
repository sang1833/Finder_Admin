import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-manage-item-type',
  templateUrl: './manage-item-type.component.html',
  styleUrls: ['./manage-item-type.component.scss'],
})
export class ManageItemTypeComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  userModule = {
    remoteEntry: 'http://localhost:6006/remoteEntry.js',
    remoteName: 'managerUser_app',
    exposedModule: 'ManageItemTypeLoader',
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
