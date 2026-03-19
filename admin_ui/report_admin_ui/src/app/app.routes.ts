import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('../app/features/no-auth/no-auth.module').then(m=>m.NoAuthModule)
    },
    {
        path:'auth',
        loadChildren:()=>import('../app/features/auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path:'login',
        redirectTo:'',
        pathMatch:'full'
    }
];
