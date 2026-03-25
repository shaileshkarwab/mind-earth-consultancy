import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterModel } from './filter-model';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BoxIcon } from '../../constants/box-icon';
import { LoadDataResolverService } from './load-data-resolver.service';
import { ApiResponse } from '../../models';
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { SelectDropDownComponent } from "../select-drop-down/select-drop-down.component";
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-list-page-filter',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf, DatePickerComponent, SelectDropDownComponent],
  templateUrl: './list-page-filter.component.html',
  styleUrl: './list-page-filter.component.css'
})
export class ListPageFilterComponent implements OnInit, OnDestroy {

  @Input() json?: string;
  httpClient = inject(HttpClient);
  filterUI: FilterModel = {};
  jsonFilterSubScription?: Subscription;
  filterForm!: FormGroup;
  formbuilder = inject(FormBuilder);
  boxIcons = BoxIcon;
  hidefilter: boolean = false;
  @Output() serachEvent = new EventEmitter<Filter>();
  ngOnInit(): void {
    this.readJsonFile()
  }

  readJsonFile() {
    this.jsonFilterSubScription = this.httpClient.get<FilterModel>(`/assets/filter-json/${this.json}`)
      .subscribe({
        next: (next) => {
          this.filterUI = next;
          this.createForm();
        },
        error: (rror) => { }
      });
  }


  ngOnDestroy(): void {
    this.jsonFilterSubScription?.unsubscribe();
  }

  createForm() {
    const group: any = {};
    this.filterUI.rows?.forEach(row => {
      row.columns?.forEach(cmp => {
        cmp.fields?.forEach(f => {
          group[f.name!] = new FormControl('');
        });
      });
    });
    this.filterForm = this.formbuilder.group(group);
  }

  toggleFilter() {
    this.hidefilter = !this.hidefilter;
  }

  searchCommand() {
    let filter: Filter = {
      equalityFilters: [],
      boolFilters: [],
      integerRangeFilters: [],
      pageParameter: {
        pageNo: 1,
        pageSize: 10
      }
    };
    this.filterUI.rows?.forEach(row => {
      row.columns?.forEach(col => {
        col.fields?.forEach(field => {
          console.log(this.filterForm.get(field.name!)?.value);
          if (this.filterForm.get(field.name!)?.value) {
            switch (field.filter) {
              case "equlityFilter":
                filter.equalityFilters?.push({
                  entity: field.datafilter?.entity!,
                  filterColumn: field.datafilter?.fieldName!,
                  value: this.filterForm.get(field.name!)!.value
                });
                break;
              case "booleanFilter":
                filter.boolFilters?.push({
                  entity: field.datafilter?.entity!,
                  filterColumn: field.datafilter?.fieldName!,
                  value: this.filterForm.get(field.name!)!.value
                });
                break;
              case "integerRangeFilter":
                filter.integerRangeFilters?.push({
                  entity: field.datafilter?.entity!,
                  filterColumn: field.datafilter?.fieldName!,
                  value: this.filterForm.get(field.name!)!.value,
                  rangeType: field.datafilter?.range!
                });
                break;
            }
          }
        });
      });
    });
    this.serachEvent.emit(filter);
  }

  clearFilter()
  {
    this.filterForm = this.formbuilder.group({});
    this.createForm();
  }

}
