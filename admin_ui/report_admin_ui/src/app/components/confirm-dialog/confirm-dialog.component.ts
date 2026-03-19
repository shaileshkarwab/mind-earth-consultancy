import { Component, inject, Input } from '@angular/core';
import { ConfirmOptions } from '../../models/confirm-options';
import { ConfirmStateService } from '../../services/confirm-state-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  activeModal = inject(NgbActiveModal);
  @Input() options?:ConfirmOptions;
  constructor() {
    
  }

  no()
  {
      this.activeModal.close(false);
  }

  yes()
  {
    this.activeModal.close(true);
  }
}
