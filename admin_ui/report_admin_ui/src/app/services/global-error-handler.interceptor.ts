import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { TokenService } from '../features/no-auth/service/token.service';
import { Router } from '@angular/router';

/**
 * Global error handler interceptor using functional approach
 * Catches all HTTP errors and displays them as toast notifications
 */
export const globalErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const tokenService = inject(TokenService);
  const router = inject(Router);    
  return next(req).pipe(
    catchError((error: any) => {
      console.log('Interceptor caught error:', error);

      // Ensure error is an HttpErrorResponse
      if (error instanceof HttpErrorResponse) {
        handleError(error, toastService,tokenService,router);
      } else {
        // Handle non-HttpErrorResponse errors
        console.error('Non-HTTP Error:', error);
        toastService.error('An unexpected error occurred');
      }

      return throwError(() => error);
    })
  );
};

/**
 * Handle HTTP errors and display toast notification
 * @param error HttpErrorResponse
 * @param toastService ToastService instance
 */
function handleError(error: HttpErrorResponse, toastService: ToastService, tokenService:TokenService,router:Router): void {
  let errorMessage = 'An unexpected error occurred';
  
  try {
    // Client-side error
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    // Server-side error
    else {
      // Check if error response has custom message
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.errors && Array.isArray(error.error.errors) && error.error.errors.length > 0) {
        // Handle array of errors
        errorMessage = error.error.errors.join(', ');
      } else {
        // Fallback to status code message
        errorMessage = getErrorMessageByStatus(error.status);
      }
    }

    // Show toast error
    try {
      toastService.error(errorMessage);
      if(error.status == 401)
      {
        tokenService.remove();
        router.navigate(['/login']);
      }
    } catch (toastError) {
      console.error('Failed to show toast:', toastError);
      // Fallback: alert if toast fails
      alert(`Error: ${errorMessage}`);
    }
  } catch (handlerError) {
    console.error('Error in error handler:', handlerError);
  }

  // Log error for debugging
  console.error('Global Error Handler - Status:', error.status, 'Message:', errorMessage);
}

/**
 * Get error message based on HTTP status code
 * @param status HTTP status code
 * @returns Error message
 */
function getErrorMessageByStatus(status: number): string {
  const errorMessages: { [key: number]: string } = {
    0: 'Unable to connect to server. Please check your internet connection.',
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please login again.',
    403: 'Access forbidden. You do not have permission to access this resource.',
    404: 'Resource not found.',
    408: 'Request timeout. Please try again.',
    409: 'Conflict. The resource already exists.',
    410: 'The requested resource is no longer available.',
    422: 'Unprocessable entity. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Internal server error. Please try again later.',
    502: 'Bad gateway. The server is temporarily unavailable.',
    503: 'Service unavailable. The server is temporarily down.',
    504: 'Gateway timeout. The server took too long to respond.'
  };

  return errorMessages[status] || `Error (${status}): An unexpected error occurred`;
}
