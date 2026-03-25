import { DtoReportImage } from "./dto-report-image";

export class DtoReport {
    rowId?: string;
    excelFileName?: string;
    excelSaveFileName?: string;
    reportUrlLink?: string;
    isActive?: boolean;
    categoryId?:string;
    images?:Array<DtoReportImage>=[];
    reportTitle?:string;
    reportDesc?:string;
    reportWebImage?:string;
    reportKeyWords?:string;
    reportWebPageTitle?:string;
    showOnHomePage?:boolean;
    publishedDate?:string;
    priceInUsd?:number;
}
