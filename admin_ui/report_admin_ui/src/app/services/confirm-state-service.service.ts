import { Injectable, TemplateRef } from '@angular/core';
import { ConfirmOptions } from '../models/confirm-options';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConfirmStateService {

  constructor() { }
  options?: ConfirmOptions;
  modal?: NgbModalRef;
  template?: TemplateRef<any>;
}
