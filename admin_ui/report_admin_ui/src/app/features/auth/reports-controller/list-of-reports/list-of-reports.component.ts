import { Component, Inject, inject, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { ButtonConstants } from '../../../../constants/button-constants';
import { Router } from '@angular/router';
import { ReportService } from '../service/report.service';
import { Filter } from '../../../../models/filter';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { DtoReportList } from '../models/dto-report-list';
import { AsyncPipe, NgFor } from '@angular/common';
import { BoxIcon } from '../../../../constants/box-icon';
import { ConfirmService } from '../../../../services/confirm.service';

@Component({
  selector: 'app-list-of-reports',
  standalone: true,
  imports: [ToolBarComponent, NgFor, AsyncPipe],
  templateUrl: './list-of-reports.component.html',
  styleUrl: './list-of-reports.component.css'
})
export class ListOfReportsComponent implements OnInit {

  buttons: Array<ButtonModel> = [];
  router = inject(Router);
  reportService = inject(ReportService);
  filterAndPaging: Filter = {
    pageParameter: {
      pageNo: 1,
      pageSize: 10
    }
  };
  listOfReports$!: Observable<Array<DtoReportList>>
  boxIcons = BoxIcon;
  confirmService = inject(ConfirmService);
  ngOnInit(): void {
    this.buttons.push(ButtonConstants.AddButton());

    this.getListOfReports();

  }
  clickCommand(buttonKey: ToolBarAction) {
    switch (buttonKey) {
      case ToolBarAction.ADD:
        this.router.navigate(['/', 'auth', 'reports-controller', 'manage-report'])
    }
  }

  getListOfReports() {
    this.listOfReports$ = this.reportService.getReports(this.filterAndPaging)
      .pipe(map(respone => respone.data));
  }

  editCommand(reportId: string) {
    this.router.navigate(['/', 'auth', 'reports-controller', 'manage-report', reportId]);
  }

  deleteCommand(reportId: string) {
    this.confirmService.confirm({
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      message: 'Are you sure to delete the selected report',
      title: 'Delete Report'
    })
      .pipe(
        switchMap(confirm => {
          if (confirm) {
            return this.reportService.deleteReport(reportId);
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: () => this.getListOfReports(),
        error: err => console.error(err)
      });
  }

  
}
