import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConfigService, Config } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config from config.json', async () => {
    const mockConfig: Config = { apiURL: 'https://localhost:7072/api/' };

    const promise = service.loadConfig();

    const req = httpMock.expectOne('/assets/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);

    const result = await promise;
    expect(result).toEqual(mockConfig);
  });

  it('should cache config after first load', async () => {
    const mockConfig: Config = { apiURL: 'https://localhost:7072/api/' };

    // First call
    const promise1 = service.loadConfig();
    const req = httpMock.expectOne('/assets/config.json');
    req.flush(mockConfig);
    await promise1;

    // Second call should not make HTTP request
    const promise2 = service.loadConfig();
    httpMock.expectNone('/assets/config.json');
    const result = await promise2;
    expect(result).toEqual(mockConfig);
  });

  it('should return API URL', async () => {
    const mockConfig: Config = { apiURL: 'https://localhost:7072/api/' };

    const promise = service.loadConfig();
    const req = httpMock.expectOne('/assets/config.json');
    req.flush(mockConfig);
    await promise;

    expect(service.getApiUrl()).toBe('https://localhost:7072/api/');
  });

  it('should return specific config value', async () => {
    const mockConfig: Config = { apiURL: 'https://localhost:7072/api/' };

    const promise = service.loadConfig();
    const req = httpMock.expectOne('/assets/config.json');
    req.flush(mockConfig);
    await promise;

    expect(service.get('apiURL')).toBe('https://localhost:7072/api/');
  });

  it('should handle config load errors', async () => {
    spyOn(console, 'error');

    const promise = service.loadConfig();
    const req = httpMock.expectOne('/assets/config.json');
    req.error(new ErrorEvent('Network error'));

    try {
      await promise;
      fail('Should have thrown an error');
    } catch (error) {
      expect(console.error).toHaveBeenCalled();
    }
  });
});
