import { DtoReportImage } from "./dto-report-image";

export class DtoMetaDataResponse {
    reportUrl?: string;
    reportHeading?: string;
    reportDesc?: string;
    keyWords?: string;
    pageTitle?: string;
    excelSaveFileName?:string;
    images?: DtoReportImage[];

}
