import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { ConfigService } from './config.service';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | (string | number | boolean)[] };
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getApiUrl() || '';
  }

  /**
   * GET request
   * @param endpoint API endpoint
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  get<T = any>(endpoint: string, options?: HttpOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.httpClient
      .get<ApiResponse<T>>(url, options)
      .pipe(map(response => new ApiResponse(response)));
  }

  /**
   * POST request
   * @param endpoint API endpoint
   * @param body Request body
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  postWithResponse<T = any>(
    endpoint: string,
    body: any,
    options?: HttpOptions
  ): Observable<HttpResponse<ApiResponse<T>>> {
    const url = this.buildUrl(endpoint);

    const httpOptions = {
      ...options,
      observe: 'response' as const
    };

    return this.httpClient
      .post<ApiResponse<T>>(url, body, httpOptions)
      .pipe(
        map(res => res.clone({ body: new ApiResponse<T>(res.body!) }))
      );
  }


  /**
   * POST request
   * @param endpoint API endpoint
   * @param body Request body
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  post<T = any>(
    endpoint: string,
    body: any,
    options?: HttpOptions
  ): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.httpClient
      .post<ApiResponse<T>>(url, body, options)
      .pipe(map(response => new ApiResponse(response)));
  }

  /**
   * PUT request
   * @param endpoint API endpoint
   * @param body Request body
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  put<T = any>(
    endpoint: string,
    body: any,
    options?: HttpOptions
  ): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.httpClient
      .put<ApiResponse<T>>(url, body, options)
      .pipe(map(response => new ApiResponse(response)));
  }

  /**
   * DELETE request
   * @param endpoint API endpoint
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  delete<T = any>(endpoint: string, options?: HttpOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.httpClient
      .delete<ApiResponse<T>>(url, options)
      .pipe(map(response => new ApiResponse(response)));
  }

  /**
   * PATCH request
   * @param endpoint API endpoint
   * @param body Request body
   * @param options HTTP options
   * @returns Observable of ApiResponse
   */
  patch<T = any>(
    endpoint: string,
    body: any,
    options?: HttpOptions
  ): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.httpClient
      .patch<ApiResponse<T>>(url, body, options)
      .pipe(map(response => new ApiResponse(response)));
  }

  /**
   * Build complete URL with base API URL
   * @param endpoint API endpoint
   * @returns Complete URL
   */
  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    return `${this.apiUrl}${endpoint}`;
  }

  /**
   * Set/Update API base URL
   * @param url New API base URL
   */
  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  /**
   * Get current API base URL
   * @returns Current API base URL
   */
  getApiUrl(): string {
    return this.apiUrl;
  }
}
