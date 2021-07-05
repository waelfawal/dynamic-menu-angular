import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageMenuComponent} from "./menu/manage-menu/manage-menu.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'manage', component: ManageMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
