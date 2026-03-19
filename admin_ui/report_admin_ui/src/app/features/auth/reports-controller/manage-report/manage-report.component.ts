import { Component, inject, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { ButtonConstants } from '../../../../constants/button-constants';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { LabelComponent } from "../../../../components/label/label.component";
import { ToastService } from '../../../../services';
import { FileUploadService } from '../../../../services/file-upload.service';
import { EMPTY, map, Observable, of, switchMap, take } from 'rxjs';
import { ReportService } from '../service/report.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../master-controller/service/master.service';
import { DtoLookup } from '../../master-controller/models/dto-lookup';
import { AsyncPipe, NgFor } from '@angular/common';
import { ErrorHandlerComponent } from "../../../../components";
import { DtoReportImage } from '../models/dto-report-image';
import { ReportImageComponent } from "../report-image/report-image.component";
import { ActivatedRoute, Router } from '@angular/router';
import { DtoReport } from '../models/dto-report';
import { ConfirmService } from '../../../../services/confirm.service';

@Component({
  selector: 'app-manage-report',
  standalone: true,
  imports: [ToolBarComponent, LabelComponent, ReactiveFormsModule, NgFor, AsyncPipe, ErrorHandlerComponent, ReportImageComponent],
  templateUrl: './manage-report.component.html',
  styleUrl: './manage-report.component.css'
})
export class ManageReportComponent implements OnInit {

  buttons: Array<ButtonModel> = [];
  showMessage = inject(ToastService);
  excelFile!: File;
  fileUploadService = inject(FileUploadService);
  reportService = inject(ReportService);
  reportForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  masterService = inject(MasterService);
  roles$!: Observable<Array<DtoLookup>>;
  reportImages!: Array<DtoReportImage>;
  activeRouter = inject(ActivatedRoute);
  reportID?: string;
  confirmService = inject(ConfirmService);
  ngOnInit(): void {
    this.buttons.push(ButtonConstants.BackButton());

    //for temp
    //this.getFileSections();

    this.buildForm();
    this.populateForm();

    this.activeRouter.params.subscribe(next => {
      if (next['reportid']) {
        this.reportService.reteriveReport(next['reportid'])
          .subscribe(data => {

          });
      }
    });

    this.activeRouter.params
      .pipe(
        switchMap(params => {
          this.reportID = params['reportid'];
          return this.reportID ? this.reportService.reteriveReport(this.reportID!) : EMPTY;
        })
      )
      .subscribe(data => {
        this.setFormData(data.data);
        this.reportImages = data.data.images!;
      });
  }

  clickCommand(buttonAction: ToolBarAction) {
    switch (buttonAction) {
      case ToolBarAction.ADD:
        break;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const fileExtension = file.name.split('.').pop();
    const alloWedFileExtensions = ['xls', 'xlsx'];
    if (!alloWedFileExtensions.includes(fileExtension!)) {
      this.showMessage.error('Only vaid xlsx or xls file format is allowed for file upload');
      input.value = '';
      return;
    }
    this.excelFile = file;
  }

  uploadFileCommand() {

    if (!this.excelFile) {
      this.showMessage.error('Please selected a valid file before upload');
      return;
    }

    if (this.reportForm.invalid) {
      this.showMessage.error('Please check the input before saving');
      this.reportForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append("file", this.excelFile);
    this.fileUploadService.fileUpload("reports", formData)
      .pipe(
        take(1),
        map(response => response.data),
        switchMap(data =>
          !this.reportID ?

            this.reportService.saveReport({
              categoryId: this.reportForm.get('subCategoryMasterId')?.value,
              excelFileName: this.excelFile.name,
              excelSaveFileName: data,
              isActive: this.reportForm.get('isActive')?.value,
              reportUrlLink: this.reportForm.get('reportUrlLink')?.value
            })
            :
            this.reportService.updateReport(this.reportID!, {
              categoryId: this.reportForm.get('subCategoryMasterId')?.value,
              excelFileName: this.excelFile.name,
              excelSaveFileName: data,
              isActive: this.reportForm.get('isActive')?.value,
              reportUrlLink: this.reportForm.get('reportUrlLink')?.value
            })
        )
      )
      .pipe(
        map(imageReponse => ({
          reportImages: imageReponse.data.images!,
          reportId: imageReponse.data.reportId
        }))
      ).subscribe(data => {
        this.reportImages = data.reportImages,
          this.reportID = data.reportId
      })
      ;

  }

  getFileSections() {
    this.reportService.getReportSectionsAfterUpload("e220491c-1ef8-4d6c-9ef8-6ebf7794a028.xlsx")
      .subscribe(data => {

      });
  }

  buildForm() {
    this.reportForm = this.formBuilder.group({
      reportUrlLink: [, [Validators.required, Validators.minLength(8)]],
      isActive: [true],
      rowId: [null],
      excelSaveFileName: [null],
      excelFileName: [null],
      subCategoryMasterId: ['', Validators.required]
    });
  }

  populateForm() {
    this.roles$ = this.masterService.getSubcategory()
      .pipe(
        map(response => response.data)
      )
  }

  setFormData(data: DtoReport) {
    this.reportForm.patchValue({
      subCategoryMasterId: data.categoryId,
      reportUrlLink: data.reportUrlLink,
      excelFileName: data.excelFileName,
      isActive: data.isActive,
      rowId: data.rowId
    });
  }

  selectedImageCommand(file: File, image: DtoReportImage) {
    image.isImageChanged = true;
    image.file = file;
  }

  saveReportImageCommnd(img: DtoReportImage) {
    const formData = new FormData();
    formData.append("file", img.file!);
    this.fileUploadService.fileUpload("reports", formData)
      .pipe(
        switchMap(response => {
          img.savedImageName = response.data;
          var reportID = img.rowId!;
          return this.reportService.saveReportImage(reportID, img);
        })
      )
      .pipe(
        switchMap(imageData => {
          return this.reportService.reteriveReport(this.reportID!);
        })
      )
      .subscribe(data => {
        this.reportImages = data.data.images!;
      });
  }

  deleteRportImageCommand(imageRowId: string) {
    this.confirmService.confirm({
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      message: 'Are you sure to delete the selected report image?',
      title: 'Delete Report Image'
    })
      .pipe(switchMap(response => {
        if (response) {
          return this.reportService.deleteReportImage(imageRowId);
        }
        else {
          return EMPTY;
        }
      })
      ).subscribe(data => {
        const reportImageIndex = this.reportImages.findIndex(c => c.rowId == imageRowId);
        this.reportImages.slice(reportImageIndex, 1);
      });
  }
}
