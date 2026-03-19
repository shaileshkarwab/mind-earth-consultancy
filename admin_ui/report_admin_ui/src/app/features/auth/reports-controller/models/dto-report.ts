import { DtoReportImage } from "./dto-report-image";

export class DtoReport {
    rowId?: string;
    excelFileName?: string;
    excelSaveFileName?: string;
    reportUrlLink?: string;
    isActive?: boolean;
    categoryId?:string;
    images?:Array<DtoReportImage>=[];
}
