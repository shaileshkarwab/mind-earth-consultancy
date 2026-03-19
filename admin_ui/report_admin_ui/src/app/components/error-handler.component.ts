import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-handler',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="control && control.invalid && (control.dirty || control.touched)" class="invalid-feedback d-block mt-2">
      <div *ngIf="control.errors?.['required']" class="error-message">
        <i class="bx bx-error-circle"></i> {{ fieldName }} is required
      </div>
      <div *ngIf="control.errors?.['email']" class="error-message">
        <i class="bx bx-error-circle"></i> Please enter a valid email address
      </div>
      <div *ngIf="control.errors?.['minlength']" class="error-message">
        <i class="bx bx-error-circle"></i> {{ fieldName }} must be at least {{ control.errors?.['minlength']?.requiredLength }} characters
      </div>
      <div *ngIf="control.errors?.['maxlength']" class="error-message">
        <i class="bx bx-error-circle"></i> {{ fieldName }} cannot exceed {{ control.errors?.['maxlength']?.requiredLength }} characters
      </div>
      <div *ngIf="control.errors?.['pattern']" class="error-message">
        <i class="bx bx-error-circle"></i> {{ customMessage || (fieldName + ' format is invalid') }}
      </div>
      <div *ngIf="control.errors?.['min']" class="error-message">
        <i class="bx bx-error-circle"></i> Minimum value is {{ control.errors?.['min']?.min }}
      </div>
      <div *ngIf="control.errors?.['max']" class="error-message">
        <i class="bx bx-error-circle"></i> Maximum value is {{ control.errors?.['max']?.max }}
      </div>
      <div *ngIf="control.errors?.['customError']" class="error-message">
        <i class="bx bx-error-circle"></i> {{ control.errors?.['customError'] }}
      </div>
      <div *ngIf="control.errors?.['passwordMismatch']" class="error-message">
        <i class="bx bx-error-circle"></i> The password & confirmpassword do not match
      </div>
    </div>
  `,
  styles: [`
    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      display: block;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .error-message:last-child {
      margin-bottom: 0;
    }

    .bx-error-circle {
      font-size: 1rem;
    }
  `]
})
export class ErrorHandlerComponent {
  /**
   * Form control to display errors for
   */
  @Input() control: AbstractControl | null = null;

  /**
   * Field name to display in error messages
   */
  @Input() fieldName: string = 'Field';

  /**
   * Custom error message for pattern validation
   */
  @Input() customMessage?: string;
}
