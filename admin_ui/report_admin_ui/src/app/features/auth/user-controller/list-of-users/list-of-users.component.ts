import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToolBarComponent } from "../../../../components/tool-bar/tool-bar.component";
import { ButtonModel } from '../../../../models/button-model';
import { BoxIcon } from '../../../../constants/box-icon';
import { ToolBarAction } from '../../../../constants/tool-bar-action';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserListCardComponent } from "../../../../components/user-list-card/user-list-card.component";
import { UserService } from '../services/user.service';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { DtoUserList } from '../models/dto-user-list';
import { ConfirmService } from '../../../../services/confirm.service';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-list-of-users',
  standalone: true,
  imports: [ToolBarComponent, NgFor, UserListCardComponent, AsyncPipe],
  templateUrl: './list-of-users.component.html',
  styleUrl: './list-of-users.component.css'
})
export class ListOfUsersComponent implements OnInit, OnDestroy {


  buttons: Array<ButtonModel> = [
    {
      icon: '',
      type: 'button',
      class: 'btn btn-primary',
      iconClass: BoxIcon.ADD,
      key: ToolBarAction.ADD
    }
  ]
  offCanvasService = inject(NgbOffcanvas);
  userService = inject(UserService);
  users$!: Observable<Array<DtoUserList>>;
  offCanvasSubscription?: Subscription;
  confirmService = inject(ConfirmService);
  showToast = inject(ToastService);
  //methods
  clickCommand(buttonKey: ToolBarAction) {
    switch (buttonKey) {
      case ToolBarAction.ADD:
        this.showManageUserCanvas();
        break;
    }
  }

  showManageUserCanvas(userID?: string) {
    const offCanvas = this.offCanvasService.open(ManageUserComponent, {
      position: 'end',
      backdrop: 'static'
    });
    offCanvas.componentInstance.userId = userID;

    this.offCanvasSubscription = offCanvas.closed.subscribe((data) => {
      this.getUsers();
    });

  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users$ = this.userService.getUsers()
      .pipe(map(response => response.data));
  }

  deleteCommand(rowId: string) {
    this.confirmService.confirm({
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      message: 'Are you sure to delete the selected user?',
      title: 'Delete User'
    }).pipe(
      switchMap((response: boolean) => {
        if (!response) {
          return of(null);
        }
        else {
          return this.userService.deleteUser(rowId);
        }
      })
    ).subscribe((data) => {
      if (data?.data) {
        this.showToast.success('The selected user has been deleted successfully');
        this.getUsers();
      }
    });
  }

  editCommand(rowId: string) {
    this.showManageUserCanvas(rowId);
  }

  ngOnDestroy(): void {
    this.offCanvasSubscription?.unsubscribe();
  }
}
