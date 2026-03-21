import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoxIcon } from '../../../../constants/box-icon';
import { NgClass, NgForOf } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';
import { DtoCategory, DtoSubCategory } from '../models/dto-category';
import { MasterService } from '../service/master.service';
import { catchError, exhaustMap, map, Observable, of, shareReplay } from 'rxjs';
import { ConfirmService } from '../../../../services/confirm.service';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgForOf],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {

  offcanvas = inject(NgbActiveOffcanvas);
  categoryForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  boxIcon = BoxIcon;
  toastService = inject(ToastService);
  masterService = inject(MasterService);
  @Input() categoryID?: string;
  confirmService = inject(ConfirmService)
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      seqNo: ['', [Validators.required]],
      isActive: [true,],
      rowId: [null],
      subCategories: this.formBuilder.array([])
    });

    if (this.categoryID) {
      this.masterService.getCategoryDetailsById(this.categoryID)
        .pipe(shareReplay(1))
        .subscribe(data => {
          this.setFormData(data.data);
        });
    }

  }

  setFormData(data: DtoCategory) {
    this.categoryForm.patchValue({
      name: data.name,
      seqNo: data.seqNo,
      isActive: data.isActive,
      rowId: data.rowId
    });

    // Clear existing FormArray
    this.subCategories.clear();

    if (data.subCategories && data.subCategories.length > 0) {
      data.subCategories.forEach((sub: any) => {
        this.subCategories.push(this.createSubCategory(sub));
      });
    }

  }

  createSubCategory(data?: any): FormGroup {
    return this.formBuilder.group({
      id: [data?.id || 0],
      name: [data?.name || '', Validators.required],
      isActive: [data?.isActive || '', Validators.required],
      rowId: [data?.rowId || ''],
      seqNo: [data?.seqNo || 0, Validators.required],
      subCategoryListUrl: [data?.subCategoryListUrl || '', Validators.required]
    });
  }

  get subCategories(): FormArray {
    return this.categoryForm.get('subCategories') as FormArray;
  }

  addCommand() {
    if (this.categoryForm.valid) {
      this.subCategories.push(this.createRow());
    }
    else {
      this.errorMessage();
    }
  }

  createRow(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      seqNo: ['', Validators.required],
      isActive: [true],
      subCategoryListUrl:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (!this.categoryID) {
        this.saveCategory().subscribe((next) => {
          if (next) {
            this.toastService.success('Category & SubCategory Created Successfully');
            this.offcanvas.close();
          }
        });
      }
      else {
        this.updateCategory().subscribe((next) => {
          if (next) {
            this.toastService.success('Category & SubCategory Updated Successfully');
            this.offcanvas.close();
          }
        });
      }
    }
    else {
      this.errorMessage();
    }
  }

  saveCategory(): Observable<boolean> {
    const dto: DtoCategory = this.categoryForm.value;
    return this.masterService.createCategory(dto)
      .pipe(map(response => {
        if (response.success && response.data) {
          return true;
        }
        return false;
      }),
        catchError(() => {
          return of(false);
        })
      );
  }


  updateCategory(): Observable<boolean> {
    const dto: DtoCategory = this.categoryForm.value;
    return this.masterService.updateCategory(this.categoryID!, dto)
      .pipe(map(response => {
        if (response.success && response.data) {
          return true;
        }
        return false;
      }),
        catchError(() => {
          return of(false);
        })
      );
  }




  errorMessage() {
    this.toastService.error('Make sure the entries are complete before adding a new row or submitting');
  }

  deleteSubCategoryCommand(index: number) {
    this.confirmService.confirm({
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      message: 'Are you sure to delete the sub category',
      title: 'Delete SubCategory'
    }).subscribe(data => {
      if (data) {
        const rowID = this.subCategories.at(index).get('rowId')?.value;
        this.masterService.deleteSubCategory(rowID)
          .subscribe(response => {
            if (response.data) {
              this.toastService.success('SubCategory delete Successfully');
              this.subCategories.removeAt(index);
            }
          });
      }
    });
  }
}
