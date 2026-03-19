export interface LeftMenu {
    text: string;
    controller: string;
    pageUrl: string | null;
    faIcon: string | null;
    details: DTO_AdminMenuDetail[];
    toggle:boolean;
}

interface DTO_AdminMenuDetail {
    text: string;
    pageUrl: string;
    isActive: boolean;
    faIcon: string | null;
}
