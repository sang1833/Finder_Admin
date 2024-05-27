import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';
import { PostAppComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginVueAppComponent } from './login-vue/login-vue.component';

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
    children: [
      {
        path: 'posts',
        component: PostAppComponent,
      },
      {
        path: '**',
        redirectTo: 'posts',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
