import {
  Component,
  forwardRef,
  Injectable,
  OnInit
} from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';

import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (!value) return null;

    const [day, month, year] = value.split(this.DELIMITER);
    return { day: +day, month: +month, year: +year };
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? `${String(date.day).padStart(2, '0')}-${String(date.month).padStart(2, '0')}-${date.year}`
      : '';
  }
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgbInputDatepicker, ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  inputDate = new FormControl<NgbDateStruct | null>(null);

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.inputDate.valueChanges.subscribe(val => {
      if (val) {
        const formatted =
          String(val.day).padStart(2, '0') + '-' +
          String(val.month).padStart(2, '0') + '-' +
          val.year;

        this.onChange(formatted); // ✅ child → parent
      } else {
        this.onChange(null);
      }

      this.onTouched();
    });
  }

  // ✅ parent → child
  writeValue(value: any): void {
    if (!value) {
      this.inputDate.setValue(null, { emitEvent: false });
      return;
    }

    if (typeof value === 'string') {
      const [day, month, year] = value.split('-');

      this.inputDate.setValue(
        { day: +day, month: +month, year: +year },
        { emitEvent: false }
      );
    } else {
      this.inputDate.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputDate.disable() : this.inputDate.enable();
  }
}