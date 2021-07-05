export interface MenuModel {
  name: string;
  link: string;
  level?: number;
  children: Array<MenuModel>;
}
