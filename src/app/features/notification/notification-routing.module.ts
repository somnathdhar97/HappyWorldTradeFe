import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/demo/components/notfound/notfound.component';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
  { path: '', component: NotificationComponent},
  { path: 'new-notification', loadChildren: () => import('./new-notification/new-notification.module').then(m => m.NewNotificationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
