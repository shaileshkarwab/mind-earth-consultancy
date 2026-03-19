import { Component, forwardRef, inject, Injectable, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepicker, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? `${String(date.day).padStart(2, '0')}${this.DELIMITER}${String(date.month).padStart(2, '0')}${this.DELIMITER}${date.year}`
      : '';
  }
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgbInputDatepicker, ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  inputDate?: string;
  form!: FormGroup;
  fb = inject(FormBuilder);
  DELIMITER: string = '-';
  ngOnInit(): void {
    this.form = this.fb.group({
      inputDate: [null]
    });

    // Example: set date value
    this.setDate();
  }


  setDate() {

    // Example Date
    const date = new Date();

    this.form.patchValue({
      inputDate: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    });

  }

  onChange: (value: string | null) => void = () => { };
  onTouched: () => void = () => { };
  writeValue(obj: any): void {
    if (typeof obj === 'string') {
      this.inputDate = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }


}



