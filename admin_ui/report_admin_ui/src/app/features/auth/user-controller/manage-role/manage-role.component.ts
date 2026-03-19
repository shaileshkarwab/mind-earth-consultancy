import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoxIcon } from '../../../../constants/box-icon';
import { LabelComponent } from "../../../../components/label/label.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { map, Observable, of, Subscription, take, tap } from 'rxjs';
import { DTO_MenuDetail, DtoMenu } from '../models/dto-menu';
import { AsyncPipe, NgForOf } from '@angular/common';
import { DTO_RoleDetail, DtoRole } from '../models/dto-role';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-manage-role',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, AsyncPipe, NgForOf],
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.css'
})
export class ManageRoleComponent implements OnInit, OnDestroy {


  activeModal = inject(NgbActiveModal);
  boxIcon = BoxIcon;
  roleForm?: FormGroup;
  formBuilder = inject(FormBuilder);
  @Input() roleDetailRowId?: string;
  roleService = inject(RoleService);
  dataSubscription!: Subscription;
  menuAndMenuDetail: Array<DtoMenu> = [];
  showMessage = inject(ToastService);
  // methods
  ngOnInit(): void {
    this.buildForm();
    this.dataSubscription = this.populateData().subscribe((data) => {
      this.menuAndMenuDetail.forEach(c => {
        this.menuDetails.push(this.createMenuRow(c));
      });

      //
      this.roleService.getRoleDataById(this.roleDetailRowId!)
        .pipe(
          take(1),
          tap(res => this.setFormData(res.data))
        )
        .subscribe();
    });
  }

  setFormData(data: DtoRole) {
    this.roleForm?.patchValue({
      roleName: data.text,
      isActive: data.isActive,
      rowId: data.rowId
    });

    this.menuDetails.controls.forEach((c, n) => {
      const roleDetails = this.getDetails(n);
      roleDetails.controls.forEach((v, i) => {
        let menuID = v.get('menuDetailId')?.value;
        let roleDetail = data.roles?.find(c => c.menuDetailId == menuID);
        v.get('addRight')?.setValue(roleDetail?.addRight);
        v.get('viewRight')?.setValue(roleDetail?.viewRight);
        v.get('modifyRight')?.setValue(roleDetail?.modifyRight);
        v.get('deleteRight')?.setValue(roleDetail?.deleteRight);
      });
    });

  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  buildForm() {
    this.roleForm = this.formBuilder.group({
      roleName: ['', [Validators.required, Validators.minLength(4)]],
      isActive: [true],
      rowId: [null],
      menuDetails: this.formBuilder.array<FormGroup>([])
    });
  }

  populateData(): Observable<void> {
    return this.roleService.getModuleAndModuleDetails().pipe(
      tap(response => {
        this.menuAndMenuDetail = response.data;
      }),
      map(() => void 0)
    )
  }

  get menuDetails(): FormArray<FormGroup> {
    return this.roleForm?.get('menuDetails') as FormArray<FormGroup>;
  }

  createDetailRow(detail: DTO_MenuDetail): FormGroup {
    return this.formBuilder.group({
      menuDetailId: [detail.menuDetailId],
      text: [detail.text],
      isActive: [detail.isActive],
      addRight: [detail.addRight],
      viewRight: [detail.viewRight],
      modifyRight: [detail.modifyRight],
      deleteRight: [detail.deleteRight],
      rowId: [detail.rowId]
    });
  }

  createMenuRow(menu: DtoMenu): FormGroup {

    const detailArray = this.formBuilder.array<FormGroup>([]);

    menu.menuDetails?.forEach(detail => {
      detailArray.push(this.createDetailRow(detail));
    });

    return this.formBuilder.group({
      rowId: [menu.rowId],
      text: [menu.text],
      isActive: [menu.isActive],
      details: detailArray
    });
  }

  getDetails(menuIndex: number): FormArray<FormGroup> {
    const details = this.menuDetails.at(menuIndex).get('details') as FormArray<FormGroup>;
    return details;
  }

  getRoleDTO(): DtoRole {
    const role = this.roleForm?.getRawValue();
    return {
      rowId: role.rowId,
      text: role.roleName,
      isActive: role.isActive,
      roles: this.getRole(role)
    }
  }

  getRole(role: any): Array<DTO_RoleDetail> {
    let roleDetails: Array<DTO_RoleDetail> = [];
    role.menuDetails.forEach((m: any) => {
      m.details.forEach((d: any) => {
        roleDetails.push({
          addRight: d.addRight,
          deleteRight: d.deleteRight,
          rowId: d.rowId,
          menuDetailId: d.menuDetailId,
          modifyRight: d.modifyRight,
          viewRight: d.viewRight
        });
      })
    });
    return roleDetails;
  }

  onSumit() {
    console.log(this.roleForm?.value);

    this.saveRole()
      .subscribe(data => {
        if (data) {
          this.showMessage.success('The role has been created successfully');
          this.activeModal.close();
        }
      });
  }

  saveRole(): Observable<boolean> {
    const role: DtoRole = this.getRoleDTO();
    return this.roleService.createRole(role)
      .pipe(
        map(response => response.success)
      );
  }
}
