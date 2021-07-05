import { Component, OnInit } from '@angular/core';
import {NavService} from "../Services/nav.service";
import {MenuService} from "../Services/menu.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public navService: NavService, public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
