/**
 * Generic API Response model
 * T represents the type of data returned in the response
 */
export class ApiResponse<T = any> {
  /**
   * Status code of the response
   */
  statusCode: number;

  /**
   * Success flag indicating if the request was successful
   */
  success: boolean;

  /**
   * Response message
   */
  message: string;

  /**
   * Response data - can be any type
   */
  data: T;

  /**
   * Optional error details
   */
  errors?: string[];

  /**
   * Optional metadata for pagination or other info
   */
  metadata?: {
    [key: string]: any;
  };

  constructor(init?: Partial<ApiResponse<T>>) {
    this.statusCode = init?.statusCode || 200;
    this.success = init?.success || false;
    this.message = init?.message || '';
    this.data = init?.data as T;
    this.errors = init?.errors;
    this.metadata = init?.metadata;
  }
}
