import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHandlerComponent } from '../../../components/error-handler.component';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../services';
import { UserService } from '../service/user.service';
import { exhaustMap, take } from 'rxjs';
import { TokenService } from '../service/token.service';
import { NgbActiveModal, NgbActiveOffcanvas, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ErrorHandlerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //variables
  configReader = inject(ConfigService);
  formBuilder = inject(FormBuilder);
  readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    passWord: ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
  });
  toastService = inject(ToastService);
  userService = inject(UserService);
  router = inject(Router);
  tokenService = inject(TokenService);
  activeModalService = inject(NgbModal);
  activeCanvasService = inject(NgbOffcanvas);
  //methods
  ngOnInit(): void {
    this.activeModalService.dismissAll();
    this.activeCanvasService.dismiss();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.verifyUser({
        userName: this.loginForm.get('userName')!.getRawValue(),
        passWord: this.loginForm.get('passWord')!.getRawValue()
      }).subscribe({
        next: (next) => {
          this.tokenService.saveToken(next.data);
          this.router.navigate(['/auth/dash-board/user-dash-board']);
        }
      });

      ;
    }
    else {

    }
  }
}
