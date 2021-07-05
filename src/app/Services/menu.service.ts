import {Injectable} from '@angular/core';
import {MenuModel} from "../Models/menu.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  TREE_DATA: Array<MenuModel> = [
    {
      name: 'test',
      link: 'http://test.com',
      children: [
        {
          name: 'child',
          link: 'http://test.com',
          children: []
        }
      ]
    }

  ];
  dataChange = new BehaviorSubject<MenuModel[]>([]);

  get data(): MenuModel[] {
    return this.dataChange.value;
  }


  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `MenuModel` with nested
    //     file node as children.
    this.getMenu();
    const data = this.TREE_DATA;

    // Notify the change.
    this.dataChange.next(data);
  }


  /** Add an item to to-do list */
  insertItem(parent: MenuModel, name: string, link: string) {
    if (!parent.children) parent.children = [];
    parent.children.push({name: name, link: link} as MenuModel);
    this.dataChange.next(this.data);
  }

  updateItem(node: MenuModel, name: string, link: string) {
    node.name = name;
    node.link = link;
    this.dataChange.next(this.data);
  }

  addNewRootItem(name: string, link: string) {
    this.data.push({
      name: name,
      link: link,
      children: []
    });
    this.dataChange.next(this.data);
  }
  saveMenu() {
    localStorage.setItem('menu', JSON.stringify(this.data))
  }
  getMenu() {
    const menu = JSON.parse(localStorage.getItem('menu')!);
    if(menu) {
      this.TREE_DATA = menu
    } else {
      this.TREE_DATA = [];
    }
  }
}
