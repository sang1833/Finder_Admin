import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ReactWrapperComponent } from './wrappers/react-wrapper/react-wrapper.component';
import { VueWrapperComponent } from './wrappers/vue-wrapper/vue-wrapper.component';
import { AngularWrapperComponent } from './wrappers/angular-wrapper/angular-wrapper.component';
import { HeaderAppComponent } from './head/header.component';
import { SidebarAppComponent } from './sidebar/sidebar.component';
import { PostAppComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginVueAppComponent } from './login-vue/login-vue.component';
import { ChatAppComponent } from './chat/chat.component';
import { ManageUserAppComponent } from './manage-user/user.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ReactWrapperComponent,
    VueWrapperComponent,
    AngularWrapperComponent,
    HeaderAppComponent,
    SidebarAppComponent,
    PostAppComponent,
    DashboardComponent,
    LoginVueAppComponent,
    ChatAppComponent,
    ManageUserAppComponent,
    ReportComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
