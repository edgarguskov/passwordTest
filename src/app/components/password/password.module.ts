import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from "@angular/forms";
import { PasswordComponent } from "./password.component";

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordComponent
  ],
  bootstrap: []
})
export class PasswordModule { }
