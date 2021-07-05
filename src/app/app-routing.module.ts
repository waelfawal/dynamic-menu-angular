import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageMenuComponent} from "./menu/manage-menu/manage-menu.component";

const routes: Routes = [
  {path:'manage', component: ManageMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
