import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuCardModule } from 'src/app/shared/menu-card/menu-card.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MenuCardModule,
    TableModule
  ]
})
export class DashboardModule { }
