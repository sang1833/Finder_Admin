import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  headerModule = {
    remoteEntry: 'http://localhost:6001/remoteEntry.js',
    remoteName: 'header_app',
    exposedModule: 'HeaderAppLoader',
  };

  constructor(readonly appService: AppService) {}

  async ngAfterViewInit() {
    loadRemoteModule(this.headerModule).then((module) => {
      this.loader = module.default;
    });
  }

  logout() {
    window.location.reload();
  }
}
