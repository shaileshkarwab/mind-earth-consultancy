import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../no-auth/login/login.component').then(M => M.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('../no-auth/forgot-password/forgot-password.component').then(M => M.ForgotPasswordComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoAuthRoutingModule { }
