import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../services';
import { DtoCategory } from '../models/dto-category';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models';
import { UrlConstants } from '../../../../constants/url-constants';
import { Filter } from '../../../../models/filter';
import { DtoSearchCategoryResponse } from '../models/dto-search-category-response';
import { DtoLookup } from '../models/dto-lookup';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  httpService = inject(HttpService);

  createCategory(category: DtoCategory): Observable<ApiResponse<string>> {
    return this.httpService.post(UrlConstants.CREATE_CATEGORY, category);
  }

  searchCategory(filter: Filter): Observable<ApiResponse<Array<DtoSearchCategoryResponse>>> {
    return this.httpService.post(UrlConstants.SEARCH_CATEGORY, filter);
  }

  getCategoryDetailsById(categoryID: string): Observable<ApiResponse<DtoCategory>> {
    return this.httpService.get(`${UrlConstants.GET_CATEGORY_BY_ID}/${categoryID}`);
  }

  deleteCategory(categoryID: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_CATEGORY_BY_ID}/${categoryID}`)
  }

  updateCategory(cateGoryID: string, category: DtoCategory): Observable<ApiResponse<string>> {
    return this.httpService.put(`${UrlConstants.UPDATE_CATEGORY}/${cateGoryID}`, category);
  }

  deleteSubCategory(subCategoryID: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_SUBCATEGORY_BY_ID}/${subCategoryID}`)
  }

  getSubcategory(): Observable<ApiResponse<Array<DtoLookup>>> {
    return this.httpService.get(`${UrlConstants.GET_SUB_CATEGORY}`)
  }
}
