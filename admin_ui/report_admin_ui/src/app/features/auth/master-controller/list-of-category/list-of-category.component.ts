import { Component, Inject, inject, OnInit } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableComponent } from "../../../../components/generic-table/generic-table.component";
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { BoxIcon } from '../../../../constants/box-icon';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';
import { MasterService } from '../service/master.service';
import { Filter } from '../../../../models/filter';
import { DtoSearchCategoryResponse } from '../models/dto-search-category-response';
import { take } from 'rxjs';
import { NgFor } from '@angular/common';
import { ConfirmService } from '../../../../services/confirm.service';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-list-of-category',
  standalone: true,
  imports: [ToolBarComponent, NgFor],
  templateUrl: './list-of-category.component.html',
  styleUrl: './list-of-category.component.css'
})
export class ListOfCategoryComponent implements OnInit {

  buttons: Array<ButtonModel> = [];
  offCanService = inject(NgbOffcanvas);
  masterService = inject(MasterService);
  filter: Filter = {
    pageParameter: {
      pageNo: 1,
      pageSize: 10
    }
  };
  categories: Array<DtoSearchCategoryResponse> = [];

  columns = [
    { key: 'categoryName', header: 'Category Name' },
    { key: 'status', header: 'Status' },
    { key: 'action', header: 'Action' }
  ];
  confirm = inject(ConfirmService);
  showMessage = inject(ToastService);
  ngOnInit(): void {
    this.buttons = this.addButtons();
    this.populateGrid();
  }

  addButtons(): Array<ButtonModel> {
    return [
      {
        icon: '',
        type: 'button',
        class: 'btn btn-primary',
        iconClass: BoxIcon.ADD,
        key: ToolBarAction.ADD
      }
    ]
  }

  clickCommand(event: ToolBarAction) {
    switch (event) {
      case ToolBarAction.ADD:
        this.showOffCanvasService();
        break;
    }
  }

  populateGrid() {
    this.masterService.searchCategory(this.filter)
      .pipe(take(1))
      .subscribe(data => {
        this.categories = data.data;
      });
  }

  editCommand(data: DtoSearchCategoryResponse) {
    this.showOffCanvasService(data.rowId!)

  }

  showOffCanvasService(categoryID?: string) {
    const canvas = this.offCanService.open(ManageCategoryComponent, {
      position: 'end',
      backdrop: 'static'
    });

    if (categoryID) {
      canvas.componentInstance.categoryID = categoryID;
    }

    canvas.closed.subscribe(c=>{
      this.populateGrid();
    });
  }

  deleteCommand(selectedRow: DtoSearchCategoryResponse) {
    this.confirm.confirm({
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      message: 'Are you sure to delete the selected category?',
      title: 'Delete'
    }).subscribe(data => {
      if (data) {
        this.masterService.deleteCategory(selectedRow.rowId!)
          .subscribe(response => {
            if (response) {
              this.showMessage.success('The selected category deleted successfully');
              this.populateGrid();
            }
          });
      }
    });
  }
}
