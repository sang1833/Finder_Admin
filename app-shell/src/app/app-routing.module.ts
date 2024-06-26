import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';
import { PostAppComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginVueAppComponent } from './login-vue/login-vue.component';
import { ChatAppComponent } from './chat/chat.component';
import { ManageUserAppComponent } from './manage-user/user.component';
import { ReportComponent } from './report/report.component';
import { ManageItemTypeComponent } from './manage-item-type/manage-item-type.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginVueAppComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'posts',
        component: PostAppComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'post/post-details/:postId',
        component: PostAppComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat',
        component: ChatAppComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage-user',
        component: ManageUserAppComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage-item-type',
        component: ManageItemTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'posts',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
