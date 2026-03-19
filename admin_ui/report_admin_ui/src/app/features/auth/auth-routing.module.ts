import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dash-board',
    loadChildren: () => import('../dash-board/dash-board.module').then(M => M.DashBoardModule)
  },
  {
    path: 'master_controller',
    loadChildren: () => import('./master-controller/master-controller.module').then(m => m.MasterControllerModule)
  },
  {
    path: 'user-controller',
    loadChildren: () => import('./user-controller/user-controller.module').then(M => M.UserControllerModule)
  },
  {
    path: 'reports-controller',
    loadChildren: () => import('./reports-controller/reports-controller.module').then(M => M.ReportsControllerModule)
  },
  {
    path:'casestudy-whitepaper-controller',
    loadChildren:()=>import('./casestudy-whitepaper-controller/casestudy-whitepaper-controller.module').then(M=>M.CasestudyWhitepaperControllerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
