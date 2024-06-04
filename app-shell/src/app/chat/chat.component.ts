import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  headerModule = {
    remoteEntry: 'http://localhost:6005/remoteEntry.js',
    remoteName: 'chat_app',
    exposedModule: 'ChatAppLoader',
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
