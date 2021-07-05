import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenu} from "@angular/material/menu";
import {MenuModel} from "../Models/menu.model";

@Component({
  selector: 'app-my-mat-menu',
  templateUrl: './my-mat-menu.component.html',
  styleUrls: ['./my-mat-menu.component.scss']
})
export class MyMatMenuComponent implements OnInit {
  @ViewChild("menu", {static: true}) menu!: MatMenu;
  @Input() items!: MenuModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
