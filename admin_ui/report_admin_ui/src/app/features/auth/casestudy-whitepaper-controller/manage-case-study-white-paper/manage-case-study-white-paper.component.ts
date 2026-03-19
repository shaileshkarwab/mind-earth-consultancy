import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoxIcon } from '../../../../constants/box-icon';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from "../../../../components/label/label.component";
import { UploadImageComponent } from "../../../../components/upload-image/upload-image.component";
import { DatePickerComponent } from "../../../../components/date-picker/date-picker.component";
import { DateTimeHelper } from '../../../../helpers/date-time-helper';
import { FileUploadService } from '../../../../services/file-upload.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { DtoCaseStudy } from '../model/dto-case-study';
import { CaseStudyService } from '../service/case-study.service';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-manage-case-study-white-paper',
  standalone: true,
  imports: [LabelComponent, UploadImageComponent, DatePickerComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './manage-case-study-white-paper.component.html',
  styleUrl: './manage-case-study-white-paper.component.css'
})
export class ManageCaseStudyWhitePaperComponent implements OnInit {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  boxIcons = BoxIcon;
  caseStudyWhitePaperForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  webImageFile?: File;
  pdfFile?: File;
  fileUploadService = inject(FileUploadService);
  readonly uploadFolderPath: string = 'case-study-white-paper';
  caseStudyService = inject(CaseStudyService);
  showMessage = inject(ToastService);
  @Input() caseStudyRowId?: string;
  ngOnInit(): void {
    this.buildForm();
    if (this.caseStudyRowId) {
      this.fillData();
    }
  }

  buildForm() {
    this.caseStudyWhitePaperForm = this.formBuilder.group({
      entityType: ['1', [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      caseWpDate: [DateTimeHelper.formatDateTo_DDmmYYY(new Date()), [Validators.required]],
      imagePath: ['', [Validators.required]],
      pdfPath: ['', [Validators.required]]
    });
  }

  selectedWebImageCommand(file: File) {
    this.webImageFile = file;
  }

  selectedPDFCommand(file: File) {
    this.pdfFile = file;
  }

  submitForm() {

    const webImage$ = this.webImageFile
      ? this.fileUploadService.fileUpload(this.uploadFolderPath, this.createFormData(this.webImageFile))
      : of(null);

    const pdfFile$ = this.pdfFile
      ? this.fileUploadService.fileUpload(this.uploadFolderPath, this.createFormData(this.pdfFile))
      : of(null);

    forkJoin({
      webImage: webImage$,
      pdfFile: pdfFile$
    })
      .pipe(
        switchMap(res => {

          this.caseStudyWhitePaperForm.patchValue({
            imagePath: res.webImage?.data ?? null,
            pdfPath: res.pdfFile?.data ?? null
          });

          if (!this.caseStudyRowId) {
            return this.caseStudyService.saveCaseStudyWhitePaper(
              this.caseStudyWhitePaperForm.getRawValue()
            );
          }
          else {
            return this.caseStudyService.updateCaseStudyWhitePaper(this.caseStudyRowId!,
              this.caseStudyWhitePaperForm.getRawValue()
            );
          }
        })
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.showMessage.success('Case Study / White Paper saved successfully');
            this.activeOffcanvas.close();
          }
        },
        error: () => {
          this.showMessage.error('Something went wrong');
        }
      });
  }

  createFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  reteriveData(): Observable<DtoCaseStudy> {
    return this.caseStudyService.reteriveCaseStudyWhitePaper(this.caseStudyRowId!)
      .pipe(map(response => response.data));
  }

  fillData() {
    this.reteriveData()
      .subscribe({
        next: (next) => {
          this.caseStudyWhitePaperForm.patchValue({
            entityType: next.entityType?.toString(),
            title: next.title,
            content: next.content,
            caseWpDate: next.caseWpDate,
            imagePath: next.imagePath,
            pdfPath: next.pdfPath
          });
        },
        error: (error) => { }
      })
  }
}
