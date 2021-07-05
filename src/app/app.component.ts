import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "./Services/menu.service";
import {MenuModel} from "./Models/menu.model";
import {NavService} from "./Services/nav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dynamic-menu';
  navItems: Array<MenuModel> = []
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  constructor(private menuService: MenuService,private navService: NavService) {
  }

  ngOnInit() {
    this.navItems = this.menuService.data
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
