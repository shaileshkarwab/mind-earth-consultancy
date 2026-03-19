import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayOutComponent } from '../auth-lay-out/auth-lay-out.component';
import { ManageCategoryComponent } from '../master-controller/manage-category/manage-category.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayOutComponent,
    children: [
      {
        path: 'list-of-reports',
        loadComponent: () => import('./list-of-reports/list-of-reports.component').then(M => M.ListOfReportsComponent)
      },
      {
        path: 'manage-report',
        loadComponent: () => import('./manage-report/manage-report.component').then(M => M.ManageReportComponent)
      },
      {
        path: 'manage-report/:reportid',
        loadComponent: () => import('./manage-report/manage-report.component').then(M => M.ManageReportComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsControllerRoutingModule { }
