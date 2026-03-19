import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmStateService } from './confirm-state-service.service';
import { ConfirmOptions } from '../models/confirm-options';
import { catchError, from, map, Observable, of } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private modalService: NgbModal, private state: ConfirmStateService) { }

  confirm(options: ConfirmOptions): Observable<boolean> {
    this.state.options = options;
    const confirmModal = this.modalService.open(ConfirmDialogComponent, { centered: true });
    confirmModal.componentInstance.options = options;

    return from(confirmModal.result).pipe(
      map(result => !!result),
      catchError(() => of(false))
    )

  }
}
