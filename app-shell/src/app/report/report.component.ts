import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  loader: any = null;

  userModule = {
    remoteEntry: 'http://localhost:6007/remoteEntry.js',
    remoteName: 'report_app',
    exposedModule: 'ReportAppLoader',
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
