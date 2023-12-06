import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { MenuCardModule } from 'src/app/shared/menu-card/menu-card.module';
import { TableModule } from 'primeng/table';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    MenuCardModule,
    TableModule,
    MenuModule,
    ButtonModule,
  ]
})
export class ClientDashboardModule { }
