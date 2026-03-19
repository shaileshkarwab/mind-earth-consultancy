import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayOutComponent } from '../auth-lay-out/auth-lay-out.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayOutComponent,
    children: [
      {
        path: 'list-of-case-study-white-pappers',
        loadComponent: () => import('./list-of-case-study-white-pappers/list-of-case-study-white-pappers.component').then(M => M.ListOfCaseStudyWhitePappersComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasestudyWhitepaperControllerRoutingModule { }
