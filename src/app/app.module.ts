import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';
import {NgxEditorModule} from "ngx-editor";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CustomMenuComponent
  ],
  imports: [
    BrowserModule,
    NgxEditorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
