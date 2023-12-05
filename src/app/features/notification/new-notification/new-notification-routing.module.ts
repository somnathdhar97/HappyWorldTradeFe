import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewNotificationComponent } from './new-notification.component';

const routes: Routes = [
  { path: '', component: NewNotificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewNotificationRoutingModule { }
