import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadImageComponent } from "../upload-image/upload-image.component";
import { BoxIcon } from '../../constants/box-icon';
import { ToastService } from '../../services';

@Component({
  selector: 'app-modal-file-upload',
  standalone: true,
  imports: [UploadImageComponent],
  templateUrl: './modal-file-upload.component.html',
  styleUrl: './modal-file-upload.component.css'
})
export class ModalFileUploadComponent {
  //fields
  activeModal = inject(NgbActiveModal);
  boxIcons = BoxIcon;
  file!:File;
  showMessage = inject(ToastService);
  //methods
  selectFileCommand(event:File)
  {
    this.file = event;
  }

  uploadFileCommand()
  {
    if(!this.file)
    {
      this.showMessage.error('Please select a valid image file for upload');
      return;
    }

    this.activeModal.close(this.file);

  }
}
