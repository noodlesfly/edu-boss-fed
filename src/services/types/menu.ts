export interface menuData {
    parentId: number,
    name: string,
    href: string,
    icon: string,
    orderNum: number,
    description: string,
    shown: boolean,
    createdBy: string,
    createdTime: string,
    id:string | number,
    level: number,
    operatorId?:object,
    selected?: boolean,
    subMenuList?: any[],
    updatedBy: string
    updatedTime: string
  }

export interface ParentMenuList {
    menuInfo?: object,
    parentMenuList: menuData[]
  }
