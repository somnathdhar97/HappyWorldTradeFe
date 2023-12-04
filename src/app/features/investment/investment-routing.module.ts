import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentComponent } from './investment.component';

const routes: Routes = [
  { path: '', component: InvestmentComponent},
  { path: 'new-investment', loadChildren: () => import('./new-investment/new-investment.module').then(m => m.NewInvestmentModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule { }
