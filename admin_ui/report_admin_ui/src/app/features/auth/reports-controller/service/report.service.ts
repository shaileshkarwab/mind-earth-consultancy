import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from '../../../../constants/url-constants';
import { ApiResponse } from '../../../../models';
import { HttpService } from '../../../../services';
import { DtoReport } from '../models/dto-report';
import { DtoReportImage, DtoSaveReportResonse } from '../models/dto-report-image';
import { Filter } from '../../../../models/filter';
import { DtoReportList } from '../models/dto-report-list';
import { DtoMetaDataResponse } from '../models/dto-meta-data-response';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }
  httpService = inject(HttpService);
  getReportSectionsAfterUpload(fileName: string): Observable<ApiResponse<any>> {
    return this.httpService.get(`${UrlConstants.GET_REPORT_SECTIONS_AFTER_UPLOAD}/${fileName}`);
  }

  saveReport(saveEntity: DtoReport): Observable<ApiResponse<DtoSaveReportResonse>> {
    return this.httpService.post(`${UrlConstants.SAVE_REPORT}`, saveEntity);
  }


  updateReport(reportID: string, updateEntity: DtoReport): Observable<ApiResponse<DtoSaveReportResonse>> {
    return this.httpService.put(`${UrlConstants.UPDATE_REPORT}/${reportID}`, updateEntity);
  }

  getReports(filterAndPaging: Filter): Observable<ApiResponse<Array<DtoReportList>>> {
    return this.httpService.post(`${UrlConstants.LIST_REPORT}`, filterAndPaging);
  }

  deleteReport(reportId: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_REPORT}/${reportId}`);
  }

  reteriveReport(reportId: string): Observable<ApiResponse<DtoReport>> {
    return this.httpService.get(`${UrlConstants.RETERIVE_REPORT}/${reportId}`);
  }

  saveReportImage(reportId: string, saveImage: DtoReportImage): Observable<ApiResponse<boolean>> {
    return this.httpService.patch(`${UrlConstants.SAVE_REPORT_IMAGE}/${reportId}`, saveImage);
  }

  deleteReportImage(reportImageRowId: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_REPORT_IMAGE}/${reportImageRowId}`);
  }

  getReportSectionsAndMetaData(fileName: string): Observable<ApiResponse<DtoMetaDataResponse>> {
    return this.httpService.get(`${UrlConstants.GET_REPORT_SECTIONS_AND_META_DATA_AFTER_UPLOAD}/${fileName}`);
  }
}
