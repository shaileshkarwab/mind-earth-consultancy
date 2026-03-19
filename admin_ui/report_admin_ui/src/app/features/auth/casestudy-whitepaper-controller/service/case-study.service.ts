import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models';
import { DtoCaseStudy } from '../model/dto-case-study';
import { HttpService } from '../../../../services';
import { UrlConstants } from '../../../../constants/url-constants';
import { Filter } from '../../../../models/filter';
import { DtoCaseStudyList } from '../model/dto-case-study-list';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {

  constructor() { }
  httpService = inject(HttpService);
  saveCaseStudyWhitePaper(caseStudy: DtoCaseStudy): Observable<ApiResponse<string>> {
    return this.httpService.post(`${UrlConstants.SAVE_CASE_STUDY_WHITE_PAPER}`, caseStudy);
  }

  listCaseStudyWhitePaper(filter: Filter): Observable<ApiResponse<Array<DtoCaseStudyList>>> {
    return this.httpService.post(`${UrlConstants.LIST_CASE_STUDY_WHITE_PAPER}`, filter);
  }

  reteriveCaseStudyWhitePaper(caseStudyRowId: string): Observable<ApiResponse<DtoCaseStudy>> {
    return this.httpService.get(`${UrlConstants.RETERIVE_CASE_STUDY_WHITE_PAPER}/${caseStudyRowId}`);
  }

  updateCaseStudyWhitePaper(caseStudyId: string, caseStudy: DtoCaseStudy): Observable<ApiResponse<string>> {
    return this.httpService.put(`${UrlConstants.UPDATE_CASE_STUDY_WHITE_PAPER}/${caseStudyId}`, caseStudy);
  }

  deleteCaseStudy(caseStudyId: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_CASE_STUDY_WHITE_PAPER}/${caseStudyId}`);
  }
}
