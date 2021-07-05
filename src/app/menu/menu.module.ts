import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ManageMenuComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    SharedModule
  ],

  exports: [
    ManageMenuComponent
  ]
})
export class MenuModule { }
