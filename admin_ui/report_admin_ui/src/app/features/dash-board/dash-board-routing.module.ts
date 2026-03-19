import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayOutComponent } from '../auth/auth-lay-out/auth-lay-out.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayOutComponent,
    children: [
      {
        path: 'user-dash-board',
        loadComponent: () => import('../dash-board/user-dash-board/user-dash-board.component').then(M => M.UserDashBoardComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
