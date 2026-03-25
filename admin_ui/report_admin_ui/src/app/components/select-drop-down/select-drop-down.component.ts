import { afterNextRender, Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { LoadDataResolverService } from '../list-page-filter/load-data-resolver.service';
import { map, Observable } from 'rxjs';
import { DtoLookup } from '../../features/auth/master-controller/models/dto-lookup';
import { AsyncPipe, NgFor } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-drop-down',
  standalone: true,
  imports: [NgFor, AsyncPipe,FormsModule],
  templateUrl: './select-drop-down.component.html',
  styleUrl: './select-drop-down.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropDownComponent),
      multi: true
    }
  ]
})
export class SelectDropDownComponent implements OnInit, ControlValueAccessor {

  loadDataService = inject(LoadDataResolverService);
  @Input() serviceName?: string;
  options$!: Observable<Array<DtoLookup>>;
  @Input() placeHolder?: string;
  inputValue?: string;
  ngOnInit(): void {
    if (this.serviceName) {
      const serviceNameFunction = this.loadDataService.resolve(this.serviceName);
      if (serviceNameFunction) {

        this.options$ = serviceNameFunction().pipe
          (
            map((response: any) => response.data)
          );
      }
    }
  }

  onChange: (value: string | null) => void = () => { };
  onTouched: () => void = () => { };
  writeValue(obj: any): void {
      this.inputValue = obj ?? null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  changeEvent(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.inputValue = selectedValue;
    this.onChange(selectedValue);
  }
}
