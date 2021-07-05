import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {MenuModel} from "../../Models/menu.model";
import {MenuService} from "../../Services/menu.service";
import {DeleteConfirmDialogComponent} from "../../shared/delete-confirm-dialog/delete-confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export class MenuItemFlatNode {
  name!: string;
  level!: number;
  expandable!: boolean;
  link!: string;
  editMode!: boolean;
  hasChild!: boolean;
}

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<MenuItemFlatNode, MenuModel>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<MenuModel, MenuItemFlatNode>();

  isAdd = false;
  treeControl: FlatTreeControl<MenuItemFlatNode>;

  treeFlattener: MatTreeFlattener<MenuModel, MenuItemFlatNode>;

  dataSource: MatTreeFlatDataSource<MenuModel, MenuItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<MenuItemFlatNode>(true /* multiple */);

  constructor(private menuService: MenuService, private dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<MenuItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    menuService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: MenuItemFlatNode) => node.level;

  isExpandable = (node: MenuItemFlatNode) => node.expandable;

  getChildren = (node: MenuModel): MenuModel[] => node.children;

  hasNoContent = (_: number, _nodeData: MenuItemFlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: MenuModel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new MenuItemFlatNode();
    flatNode.name = node.name;
    flatNode.link = node.link;
    flatNode.level = level;
    flatNode.expandable = true;
    flatNode.editMode = false;
    flatNode.hasChild = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }



  /* Get the parent node of a node */
  getParentNode(node: MenuItemFlatNode): MenuItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: MenuItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.menuService.insertItem(parentNode!, '', '');
    this.treeControl.expand(node);
  }


  openConfirmDeleteDialog(node: MenuItemFlatNode) {
    let dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
              this.deleteItem(node);
      }
    });
  }
  deleteItem(node: MenuItemFlatNode) {
    const parentFlatNode = this.getParentNode(node)
    // Check if its root node
    if (parentFlatNode) {
      const parentNode = this.flatNodeMap.get(parentFlatNode);
      const index = parentNode!.children.findIndex((child:MenuModel) => node.name === child.name && node.link === child.link);
      console.log(index);
      if (index !== -1) {
        parentNode!.children.splice(index, 1);
        this.menuService.dataChange.next(this.menuService.data);
        this.flatNodeMap.delete(node);
      }
    } else {
      const parentNode = this.flatNodeMap.get(node);
      const index = this.menuService.data.indexOf(parentNode!);
      this.menuService.data.splice(index,1);
      this.menuService.dataChange.next(this.menuService.data);
    }
    // const index = parentNode!.children.findIndex((child:MenuModel) => node.name === child.name && node.link === child.link);
    // console.log(index);
    // if (index !== -1) {
    //   parentNode!.children.splice(index, 1);
    //   this.menuService.dataChange.next(this.menuService.data);
    //   this.flatNodeMap.delete(node);
    // }
  }

  saveNode(node: MenuItemFlatNode, itemName: string, itemLink: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.menuService.updateItem(nestedNode!, itemName, itemLink);
  }
  addNewRoot(itemName: string,itemLink:string) {
    this.menuService.addNewRootItem(itemName, itemLink);
  }
}
