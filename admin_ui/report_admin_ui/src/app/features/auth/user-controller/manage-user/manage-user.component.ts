import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoxIcon } from '../../../../constants/box-icon';
import { UploadImageComponent } from "../../../../components/upload-image/upload-image.component";
import { LabelComponent } from "../../../../components/label/label.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ErrorHandlerComponent } from "../../../../components";
import { passwordMatchValidator } from '../../../../validators/passwordMatchValidator';
import { RoleService } from '../services/role.service';
import { ApiResponse } from '../../../../models';
import { RoleList, RoleLookUp } from '../models/role-list';
import { iif, map, Observable, of, switchMap, take } from 'rxjs';
import { UserService } from '../services/user.service';
import { DtoManageUser } from '../models/dto-manage-user';
import { ToastService } from '../../../../services';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [UploadImageComponent, LabelComponent, ReactiveFormsModule, NgIf, ErrorHandlerComponent, AsyncPipe, NgFor],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {

  activeOffcanvas = inject(NgbActiveOffcanvas);
  boxIcon = BoxIcon;
  userForm?: FormGroup;
  formbuilder = inject(FormBuilder);
  readonly passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  roleService = inject(RoleService);
  activeRoles$?: Observable<Array<RoleLookUp>>;
  userService = inject(UserService);
  showMessage = inject(ToastService);
  @Input() userId?: string;

  //methods
  ngOnInit(): void {
    this.buildForm();
    this.getRoles()
      .pipe(
        switchMap(() =>
          this.userId
            ? this.userService.getUserById(this.userId)
            : of(null)
        )
      )
      .subscribe(user => {
        this.userForm!.patchValue(user!.data);
      });
  }

  buildForm() {
    this.userForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      roleId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('')]],
      confirmPassWord: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      userImage: []
    },
      {
        validators: passwordMatchValidator()
      }
    );


  }

  onSubmit() {
    console.log(this.userForm!.value);
    if (this.userForm!.invalid) {
      this.userForm!.markAllAsTouched();
      return;
    }

    if (this.userForm!.valid) {
      const user: DtoManageUser = this.userForm?.value;
      this.createUser(user)
        .subscribe(result => {
          if (result) {
            this.showMessage.success('User Created Usscessfully');
            this.activeOffcanvas.close();
          }
        });
    }
  }

  createUser(user: DtoManageUser): Observable<boolean> {
    return this.userService.createUser(user)
      .pipe(map(response => {
        return response.success && response.data != undefined;
      }));
  }

  getRoles(): Observable<boolean> {
    return this.roleService.getActiveRoles()
      .pipe(
        map(res => {
          this.activeRoles$ = of(res.data);
          return true;
        })
      );
  }

  get hidePassword():boolean
  {
    return this.userId === undefined
  }
}
