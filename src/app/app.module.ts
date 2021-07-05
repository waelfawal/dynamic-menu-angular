import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuModule} from "./menu/menu.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from "ngx-toastr";
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavService} from "./Services/nav.service";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MyMatMenuComponent } from './my-mat-menu/my-mat-menu.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent,
    TopNavComponent,
    MyMatMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MenuModule,
    MatMenuModule
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
