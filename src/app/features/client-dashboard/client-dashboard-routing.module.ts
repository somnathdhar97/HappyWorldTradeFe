import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';

const routes: Routes = [{ path: '', component: ClientDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDashboardRoutingModule { }
