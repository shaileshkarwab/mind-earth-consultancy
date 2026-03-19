import { Component, inject, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { AsyncPipe, NgFor } from '@angular/common';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { MasterService } from '../../master-controller/service/master.service';
import { RoleService } from '../services/role.service';
import { map, Observable, switchMap, take } from 'rxjs';
import { RoleList } from '../models/role-list';
import { Filter } from '../../../../models/filter';
import { ButtonConstants } from '../../../../constants/button-constants';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ManageRoleComponent } from '../manage-role/manage-role.component';
import { ConfirmService } from '../../../../services/confirm.service';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-list-of-roles',
  standalone: true,
  imports: [ToolBarComponent, NgFor, AsyncPipe],
  templateUrl: './list-of-roles.component.html',
  styleUrl: './list-of-roles.component.css'
})
export class ListOfRolesComponent implements OnInit {

  buttons: Array<ButtonModel> = [];
  roles$!: Observable<Array<RoleList>>;
  roleService = inject(RoleService);
  filter: Filter = {
    pageParameter: {
      pageNo: 1,
      pageSize: 10
    }
  };
  modalService = inject(NgbModal);
  confirmService = inject(ConfirmService);
  showMessage = inject(ToastService);
  //methods
  ngOnInit(): void {
    this.buttons.push(ButtonConstants.AddButton());
    this.roles$ = this.populateRoles();
  }
  clickCommand(buttonKey: ToolBarAction) {
    switch (buttonKey) {
      case ToolBarAction.ADD:
        this.showCanvas();
    }
  }

  editCommand(data: RoleList) {
    this.showCanvas(data.rowId!);
  }

  deleteCommand(data: RoleList) {
    this.confirmService.confirm({
      cancelButtonText:'No',
      confirmButtonText:'Yes',
      message:'Are you sure to delete the selected Role',
      title:'Delete'
    }).pipe(
      (take(1))
    ).subscribe(c=>{
      if(c)
        {
          this.roleService.deleteRoleDataById(data.rowId!)
          .subscribe((response)=>{
            this.showMessage.success('The selected role has been deleted successfully');
            this.roles$ = this.populateRoles();
          });
        }  
    });
  }

  populateRoles() {
    return this.roleService.getAllRoles(this.filter)
      .pipe(map(response => response.data))
  }

  showCanvas(roleId?: string) {
    const roleCanvas = this.modalService.open(ManageRoleComponent, {
      backdrop: 'static',
      size: 'xl'
    });

    roleCanvas.componentInstance.roleDetailRowId = roleId;

    roleCanvas.closed.subscribe((data) => {
      this.roles$ = this.populateRoles();
    })
  }
}
