import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewInvestmentComponent } from './new-investment.component';

const routes: Routes = [
  { path: '', component: NewInvestmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInvestmentRoutingModule { }
