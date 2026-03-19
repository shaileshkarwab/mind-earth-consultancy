export class DtoMenu {
    rowId?: string;
    text?: string;
    isActive?: boolean;
    menuDetails?: DTO_MenuDetail[];

}

export class DTO_MenuDetail{
    rowId?: string;
    text?: string;
    isActive?: boolean;
    addRight?: boolean;
    viewRight?: boolean;
    modifyRight?: boolean;
    deleteRight?: boolean;
    menuDetailId?:string;
}