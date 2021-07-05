import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from "./menu/menu.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MenuModule,
        NgbModule,
      ToastrModule.forRoot()

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
