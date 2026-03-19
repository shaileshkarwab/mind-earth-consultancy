import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayOutComponent } from '../auth-lay-out/auth-lay-out.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayOutComponent,
    children: [
      {
        path: 'list-of-users',
        loadComponent: () => import('./list-of-users/list-of-users.component').then(M => M.ListOfUsersComponent)
      },
      {
        path: 'list-of-roles',
        loadComponent: () => import('./list-of-roles/list-of-roles.component').then(M => M.ListOfRolesComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserControllerRoutingModule { }
