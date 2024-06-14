import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotifyComponent } from './notify/notify.component';
import { ReactWrapperComponent } from './wrappers/react-wrapper/react-wrapper.component';

@NgModule({
  declarations: [AppComponent, NotifyComponent, ReactWrapperComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
