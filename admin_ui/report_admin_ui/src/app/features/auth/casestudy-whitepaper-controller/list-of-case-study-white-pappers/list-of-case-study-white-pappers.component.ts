import { Component, inject, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { ButtonConstants } from '../../../../constants/button-constants';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ManageCaseStudyWhitePaperComponent } from '../manage-case-study-white-paper/manage-case-study-white-paper.component';
import { CaseStudyService } from '../service/case-study.service';
import { Filter } from '../../../../models/filter';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { DtoCaseStudyList } from '../model/dto-case-study-list';
import { AsyncPipe, NgFor } from '@angular/common';
import { DropDownActionComponent } from "../../../../components/drop-down-action/drop-down-action.component";
import { ConfirmService } from '../../../../services/confirm.service';

@Component({
  selector: 'app-list-of-case-study-white-pappers',
  standalone: true,
  imports: [ToolBarComponent, NgFor, AsyncPipe, DropDownActionComponent],
  templateUrl: './list-of-case-study-white-pappers.component.html',
  styleUrl: './list-of-case-study-white-pappers.component.css'
})
export class ListOfCaseStudyWhitePappersComponent implements OnInit {

  buttons: Array<ButtonModel> = [];
  canvasService = inject(NgbOffcanvas);
  caseStudyService = inject(CaseStudyService);
  filter: Filter = {
    pageParameter: {
      pageNo: 1,
      pageSize: 10
    }
  };
  caseStudyList$!: Observable<Array<DtoCaseStudyList>>;
  confirmService = inject(ConfirmService);
  ngOnInit(): void {
    this.buttons.push(ButtonConstants.AddButton());
    this.populateCaseStudyWhitePaper();
  }

  clickCommand(action: ToolBarAction) {
    switch (action) {
      case ToolBarAction.ADD:
        this.showCanvasForManageCaseStudyAndWitePapers();
        break;
    }
  }

  showCanvasForManageCaseStudyAndWitePapers(entityId?: string) {
    const offCanVas = this.canvasService.open(ManageCaseStudyWhitePaperComponent, {
      position: 'end',
      backdrop: 'static'
    });

    offCanVas.componentInstance.caseStudyRowId = entityId;

    offCanVas.closed.subscribe({
      next: (next) => {
        this.populateCaseStudyWhitePaper();
      },
      error: (error) => { }
    });
  }

  populateCaseStudyWhitePaper() {
    this.caseStudyList$ = this.caseStudyService.listCaseStudyWhitePaper(this.filter)
      .pipe(map(response => response.data));
  }

  editCommand(rowId: string) {
    this.showCanvasForManageCaseStudyAndWitePapers(rowId);
  }

  deleteCommand(rowId: string) {
      this.confirmService.confirm({
        cancelButtonText:'No',
        confirmButtonText:'Yes',
        message:'Are you sure to delete the selected case/study white paper?',
        title:'Delete Case/Study White Papper'
      })
      .pipe(
        switchMap(response=>{
          if(response)
          {
            return this.caseStudyService.deleteCaseStudy(rowId);
          }
          else
          {
            return EMPTY;
          }
        })
      )
      .subscribe({
        next:(next)=>{
          this.populateCaseStudyWhitePaper();
        },
        error:(error)=>{

        }
      });
  }
}
