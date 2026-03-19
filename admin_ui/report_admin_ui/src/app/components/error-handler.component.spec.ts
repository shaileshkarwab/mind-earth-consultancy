import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { ErrorHandlerComponent } from './error-handler.component';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandlerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHandlerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error when control is valid', () => {
    component.control = new FormControl('test@example.com', [Validators.required, Validators.email]);
    component.fieldName = 'Email';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeFalsy();
  });

  it('should display required error', () => {
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched();
    component.control = control;
    component.fieldName = 'Email';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.textContent).toContain('Email is required');
  });

  it('should display email error', () => {
    const control = new FormControl('invalid-email', [Validators.email]);
    control.markAsTouched();
    component.control = control;
    component.fieldName = 'Email';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.textContent).toContain('valid email');
  });

  it('should display minlength error', () => {
    const control = new FormControl('ab', [Validators.minLength(5)]);
    control.markAsTouched();
    component.control = control;
    component.fieldName = 'Username';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.textContent).toContain('at least 5 characters');
  });

  it('should display pattern error with custom message', () => {
    const control = new FormControl('123', [Validators.pattern(/^[A-Z]/i)]);
    control.markAsTouched();
    component.control = control;
    component.fieldName = 'Code';
    component.customMessage = 'Must start with a letter';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.textContent).toContain('Must start with a letter');
  });

  it('should not display error when dirty/touched is false', () => {
    const control = new FormControl('', [Validators.required]);
    component.control = control;
    component.fieldName = 'Email';
    fixture.detectChanges();

    const errorDiv = fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorDiv).toBeFalsy();
  });
});
