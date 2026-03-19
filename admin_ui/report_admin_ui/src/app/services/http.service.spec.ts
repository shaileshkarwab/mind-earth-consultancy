import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { ApiResponse } from '../models/api-response.model';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: ConfigService,
          useValue: { getApiUrl: () => 'https://api.example.com/api/' }
        }
      ]
    });
    service = TestBed.inject(HttpService);
    configService = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should make a GET request and return ApiResponse', () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse: ApiResponse<typeof mockData> = {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: mockData,
        errors: undefined,
        metadata: undefined
      };

      service.get<typeof mockData>('users/1').subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne('https://api.example.com/api/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('POST', () => {
    it('should make a POST request and return ApiResponse', () => {
      const mockData = { id: 1, name: 'New User' };
      const mockResponse: ApiResponse<typeof mockData> = {
        statusCode: 201,
        success: true,
        message: 'Created',
        data: mockData,
        errors: undefined,
        metadata: undefined
      };

      const payload = { name: 'New User' };

      service.post<typeof mockData>('users', payload).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.statusCode).toBe(201);
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne('https://api.example.com/api/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('PUT', () => {
    it('should make a PUT request and return ApiResponse', () => {
      const mockData = { id: 1, name: 'Updated User' };
      const mockResponse: ApiResponse<typeof mockData> = {
        statusCode: 200,
        success: true,
        message: 'Updated',
        data: mockData,
        errors: undefined,
        metadata: undefined
      };

      const payload = { name: 'Updated User' };

      service.put<typeof mockData>('users/1', payload).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne('https://api.example.com/api/users/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  describe('DELETE', () => {
    it('should make a DELETE request and return ApiResponse', () => {
      const mockResponse: ApiResponse<void> = {
        statusCode: 200,
        success: true,
        message: 'Deleted',
        data: undefined as any,
        errors: undefined,
        metadata: undefined
      };

      service.delete('users/1').subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.statusCode).toBe(200);
      });

      const req = httpMock.expectOne('https://api.example.com/api/users/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('PATCH', () => {
    it('should make a PATCH request and return ApiResponse', () => {
      const mockData = { id: 1, name: 'Patched User' };
      const mockResponse: ApiResponse<typeof mockData> = {
        statusCode: 200,
        success: true,
        message: 'Patched',
        data: mockData,
        errors: undefined,
        metadata: undefined
      };

      const payload = { name: 'Patched User' };

      service.patch<typeof mockData>('users/1', payload).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data).toEqual(mockData);
      });

      const req = httpMock.expectOne('https://api.example.com/api/users/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(payload);
      req.flush(mockResponse);
    });
  });

  it('should set and get API URL', () => {
    service.setApiUrl('https://new-api.com/');
    expect(service.getApiUrl()).toBe('https://new-api.com/');
  });

  it('should handle absolute URLs without adding base URL', () => {
    const absoluteUrl = 'https://external-api.com/data';

    service.get(absoluteUrl).subscribe();

    const req = httpMock.expectOne(absoluteUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
