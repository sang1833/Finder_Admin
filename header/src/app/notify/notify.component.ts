import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent {
  popoverContent: boolean = false;
  notifyCount = 0;
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  headerModule = {
    remoteEntry: 'http://localhost:6008/remoteEntry.js',
    remoteName: 'notify_app',
    exposedModule: 'NotifyAppLoader',
  };

  constructor() {}

  async ngAfterViewInit() {
    loadRemoteModule(this.headerModule).then((module) => {
      this.loader = module.default;
    });
  }

  logout() {
    window.location.reload();
  }
}
