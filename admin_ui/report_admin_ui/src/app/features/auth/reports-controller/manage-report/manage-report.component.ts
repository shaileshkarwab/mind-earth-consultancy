import { Component, inject, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { ButtonConstants } from '../../../../constants/button-constants';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { LabelComponent } from "../../../../components/label/label.component";
import { ToastService } from '../../../../services';
import { FileUploadService } from '../../../../services/file-upload.service';
import { EMPTY, forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { ReportService } from '../service/report.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../master-controller/service/master.service';
import { DtoLookup } from '../../master-controller/models/dto-lookup';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ErrorHandlerComponent } from "../../../../components";
import { DtoReportImage, DtoSaveReportResonse } from '../models/dto-report-image';
import { ReportImageComponent } from "../report-image/report-image.component";
import { ActivatedRoute, Router } from '@angular/router';
import { DtoReport } from '../models/dto-report';
import { ConfirmService } from '../../../../services/confirm.service';
import { UploadImageComponent } from "../../../../components/upload-image/upload-image.component";
import { BoxIcon } from '../../../../constants/box-icon';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLinkBase, NgbNavLinkButton, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-report',
  standalone: true,
  imports: [ToolBarComponent, LabelComponent, ReactiveFormsModule, NgFor, AsyncPipe, ErrorHandlerComponent, ReportImageComponent, UploadImageComponent, NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet, NgIf],
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
  boxIcons = BoxIcon;
  webImageFile!: File;
  readonly uploadFolderPath: string = "reports";
  active: number = 1;
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





  buildForm() {
    this.reportForm = this.formBuilder.group({
      reportUrlLink: [, [Validators.required, Validators.minLength(8),Validators.pattern(/^[^\s&]+$/)]],
      isActive: [true],
      rowId: [null],
      excelSaveFileName: [null],
      excelFileName: [null],
      subCategoryMasterId: ['', Validators.required],
      reportTitle: ['', [Validators.required]],
      reportDesc: ['', [Validators.required]],
      reportWebImage: [null],
      reportKeyWords: ['', Validators.required],
      reportWebPageTitle: ['', Validators.required],
      showOnHomePage: ["false"]
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
      rowId: data.rowId,
      reportTitle: data.reportTitle,
      reportDesc: data.reportDesc,
      reportWebImage: data.reportWebImage,
      excelSaveFileName: data.excelSaveFileName,
      reportKeyWords: data.reportKeyWords,
      reportWebPageTitle: data.reportWebPageTitle,
      showOnHomePage: data.showOnHomePage
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

  webImageFileCommand(file: File) {
    this.webImageFile = file;
  }

  createFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  uploadExcelFile() {
    if (this.excelFile) {
      this.fileUploadService.fileUpload(this.uploadFolderPath, this.createFormData(this.excelFile))
        .pipe(
          switchMap(response =>
            this.reportService.getReportSectionsAndMetaData(response.data)
          )
        )
        .subscribe({
          next: (next) => {
            if (next.success) {
              this.reportForm.patchValue({
                reportUrlLink: next.data.reportUrl,
                reportTitle: next.data.reportHeading,
                reportDesc: next.data.reportDesc,
                reportKeyWords: next.data.keyWords,
                reportWebPageTitle: next.data.pageTitle,
                excelSaveFileName: next.data.excelSaveFileName
              });
              this.reportImages = next.data.images!;
            }

          },
          error: (error) => { }
        });
    }
  }

  onSubmit() {
    if (this.reportForm.valid) {
      if (!this.reportID) {
        this.saveReport()
          .subscribe({
            next: (next) => {
              this.showMessage.success('The report has bee created sucessfully');
              this.reportID = next.reportId;
              this.reportImages = next.images!;

            },
            error: (error) => { }
          });
      }
      else {
        this.updateReport()
          .subscribe({
            next: (next) => {
              this.showMessage.success('The report has bee updatedsucessfully');
              this.reportID = next.reportId;
              this.reportImages = next.images!;
            },
            error: (error) => { }
          });
      }
    }
    else {
      this.showMessage.error('Please check the inputs. Unable to save the report');
    }
  }

  saveReport(): Observable<DtoSaveReportResonse> {
    const dto = this.setDTO();
    return this.reportService.saveReport(dto)
      .pipe(map(response => response.data));
  }

  updateReport(): Observable<DtoSaveReportResonse> {
    const dto = this.setDTO();
    return this.reportService.updateReport(this.reportID!, dto)
      .pipe(map(response => response.data));
  }

  setDTO(): DtoReport {
    let dto: DtoReport = {
      categoryId: this.reportForm.get('subCategoryMasterId')?.value,
      excelFileName: this.excelFile ? this.excelFile.name : this.reportForm.get('excelFileName')?.value,
      excelSaveFileName: this.reportForm.get('excelSaveFileName')?.value,
      isActive: this.reportForm.get('isActive')?.value,
      reportUrlLink: this.reportForm.get('reportUrlLink')?.value,
      reportTitle: this.reportForm.get('reportTitle')?.value,
      reportDesc: this.reportForm.get('reportDesc')?.value,
      reportWebImage: '',
      reportKeyWords: this.reportForm.get('reportKeyWords')?.value,
      reportWebPageTitle: this.reportForm.get('reportWebPageTitle')?.value,
      showOnHomePage: this.reportForm.get('showOnHomePage')?.value
    };
    return dto;
  }

}
