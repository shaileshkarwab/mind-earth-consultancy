import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models';
import { UrlConstants } from '../constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  httpService = inject(HttpService); 
  fileUpload(uploadFolder:string, fileData:FormData):Observable<ApiResponse<string>>
  {
    return this.httpService.post(`${UrlConstants.FILE_UPLOAD}/${uploadFolder}` ,fileData);
  }

  
}
