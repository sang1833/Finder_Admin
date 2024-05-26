import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostAppComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  headerModule = {
    remoteEntry: 'http://localhost:6003/remoteEntry.js',
    remoteName: 'post_app',
    exposedModule: 'PostAppLoader',
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
