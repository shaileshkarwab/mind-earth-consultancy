export class DtoReportImage {
    figure?:string;
    imageName?:string;
    imageTitle?:string;
    savedImageName?:string;
    rowId?:string;
    isImageAvailable?:boolean;
    isImageChanged?:boolean;
    file?:File;
    imageFullPath?:string;
}


export class DtoSaveReportResonse
{
    reportId?:string;
    images?:Array<DtoReportImage> = [];
}