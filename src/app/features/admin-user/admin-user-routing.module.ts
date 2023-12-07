import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {path:'',component:AdminUserComponent},
  { path: 'new-admin-user', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./new-admin-user/new-admin-user.module').then(m => m.NewAdminUserModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
