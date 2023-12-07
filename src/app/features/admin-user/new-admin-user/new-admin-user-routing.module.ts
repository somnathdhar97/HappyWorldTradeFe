import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAdminUserComponent } from './new-admin-user.component';

const routes: Routes = [
  {path:'',component:NewAdminUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAdminUserRoutingModule { }
