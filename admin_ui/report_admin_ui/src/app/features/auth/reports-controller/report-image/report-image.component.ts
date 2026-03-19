import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BoxIcon } from '../../../../constants/box-icon';
import { DtoReportImage } from '../models/dto-report-image';
import { AppConfigConstants } from '../../../../constants/app-config-constants';
import { NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFileUploadComponent } from '../../../../components/modal-file-upload/modal-file-upload.component';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-report-image',
  standalone: true,
  imports: [NgIf],
  templateUrl: './report-image.component.html',
  styleUrl: './report-image.component.css'
})
export class ReportImageComponent implements OnInit {

  boxIcons = BoxIcon;
  @Input() reportImage!: DtoReportImage;
  modalService = inject(NgbModal);
  @Output() selectedImage = new EventEmitter<File>();
  imagePreview?: string | ArrayBuffer | null = AppConfigConstants.DEFAULT_IMAGE;
  @Output() saveImageEvent = new EventEmitter();
  @Output() deleteImageEvent = new EventEmitter<string>();
  uploadImageCommand() {
    const fileUpload = this.modalService.open(ModalFileUploadComponent, {
      backdrop: 'static'
    });

    fileUpload.closed.subscribe(fileData => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(fileData);
      this.selectedImage.emit(fileData);
    });

  }


  saveImageCommand() {
    this.saveImageEvent.emit();
  }

  ngOnInit(): void {
    if (this.reportImage.isImageAvailable)
      this.imagePreview = this.reportImage.imageFullPath;
  }

  deleteReportImageCommand()
  {
    this.deleteImageEvent.emit(this.reportImage.rowId);
  }
}
