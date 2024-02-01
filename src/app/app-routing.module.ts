import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { authGuard } from './core/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [authGuard], data: { role: ['client', 'admin'] },
                children: [
                    { path: '', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'invest', canActivate: [authGuard], data: { role: ['client', 'admin'] }, loadChildren: () => import('./features/investment/investment.module').then(m => m.InvestmentModule) },
                    { path: 'return/:investmentId', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./features/return/return.module').then(m => m.ReturnModule) },
                    { path: 'createuser', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./core/auth/admin-registration/admin-registration.module').then(m => m.AdminRegistrationModule) },
                    { path: 'client', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule) },
                    { path: 'notification', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule) },
                    { path: 'clientDashboard', canActivate: [authGuard], data: { role: ['client'] }, loadChildren: () => import('./features/client-dashboard/client-dashboard.module').then(m => m.ClientDashboardModule) },
                    { path: 'updateProfile/:userid', canActivate: [authGuard], data: { role: ['client', 'admin'] }, loadChildren: () => import('./features/update-profile/update-profile.module').then(m => m.UpdateProfileModule) },
                    { path: 'admin-user', canActivate: [authGuard], data: { role: ['admin'] }, loadChildren: () => import('./features/admin-user/admin-user.module').then(m => m.AdminUserModule) },
                    { path: 'dialog', canActivate: [authGuard], data: { role: ['admin,client'] }, loadChildren: () => import('./features/dialog/dialog.module').then(m => m.DialogModule) },
                ]
            },
            { path: 'login', loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'registration', loadChildren: () => import('./core/auth/register/register.module').then(m => m.RegisterModule) },
            { path: 'forget-password', loadChildren: () => import('./core/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
