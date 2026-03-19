export class DtoCategory {
    name?:string;
    seqNo?:number;
    isActive?:boolean;
    rowId?:string;
    subCategories?:Array<DtoSubCategory>;
}

export class DtoSubCategory
{
    name?:string;
    seqNo?:number;
    isActive?:boolean;
    rowId?:string;
}
