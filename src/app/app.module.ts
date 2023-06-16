import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PasswordModule } from './components/password/password.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PasswordModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
