import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    DeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    DeleteConfirmDialogComponent,
  ],
})
export class SharedModule { }
