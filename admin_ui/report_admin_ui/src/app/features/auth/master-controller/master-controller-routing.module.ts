import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayOutComponent } from '../auth-lay-out/auth-lay-out.component';

const routes: Routes = [
  {
    path:'',
    component:AuthLayOutComponent,
    children:[
      {
        path:'list_of_category',
        loadComponent:()=>import('../master-controller/list-of-category/list-of-category.component').then(m=>m.ListOfCategoryComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterControllerRoutingModule { }
