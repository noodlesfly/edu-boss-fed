export interface ResourceData {
    id?: number;
    name?: string;
    startCreateTime?: string;
    url?: string;
    categoryId?: number;
    endCreateTime?: string;
    current?: number;
    size?: number;
}

export interface ResourceCategories {
    createdBy?: string,
    createdTime?: string,
    id?: number,
    name: string,
    operatorId?: string | null,
    selected?: false,
    sort?: number,
    updatedBy?: string,
    updatedTime:string
}
