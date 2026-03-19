export class DtoRole {
    rowId?: string | null;
    text?: string;
    isActive?: boolean;
    roles?: DTO_RoleDetail[];
}

export class DTO_RoleDetail
{
    rowId?: string | null;
    menuDetailId?: string;
    addRight?: boolean;
    viewRight?: boolean;
    deleteRight?: boolean;
    modifyRight?: boolean;
}