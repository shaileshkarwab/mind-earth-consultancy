import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { globalErrorHandlerInterceptor } from './global-error-handler.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

describe('globalErrorHandlerInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ToastService, useValue: toastSpy },
        provideHttpClient(
          withInterceptors([globalErrorHandlerInterceptor])
        )
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show error toast on 400 Bad Request', (done) => {
    const testUrl = '/api/test';
    const expectedMessage = 'Bad request. Please check your input.';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed with 400 error'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
  });

  it('should show error toast on 401 Unauthorized', (done) => {
    const testUrl = '/api/test';
    const expectedMessage = 'Unauthorized. Please login again.';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed with 401 error'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should show error toast on 403 Forbidden', (done) => {
    const testUrl = '/api/test';
    const expectedMessage = 'Access forbidden. You do not have permission to access this resource.';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed with 403 error'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
  });

  it('should show error toast on 404 Not Found', (done) => {
    const testUrl = '/api/test';
    const expectedMessage = 'Resource not found.';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed with 404 error'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  it('should show error toast on 500 Internal Server Error', (done) => {
    const testUrl = '/api/test';
    const expectedMessage = 'Internal server error. Please try again later.';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed with 500 error'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush('Internal server error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should show custom error message from error response', (done) => {
    const testUrl = '/api/test';
    const customMessage = 'Custom error from server';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(customMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush({ message: customMessage }, { status: 400, statusText: 'Bad Request' });
  });

  it('should show comma-separated errors from error array', (done) => {
    const testUrl = '/api/test';
    const errors = ['Error 1', 'Error 2', 'Error 3'];
    const expectedMessage = 'Error 1, Error 2, Error 3';

    httpClient.get(testUrl).subscribe(
      () => fail('should have failed'),
      (error) => {
        expect(toastService.error).toHaveBeenCalledWith(expectedMessage);
        done();
      }
    );

    const req = httpMock.expectOne(testUrl);
    req.flush({ errors }, { status: 422, statusText: 'Unprocessable Entity' });
  });
});
