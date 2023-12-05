import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './core/layout/app.layout.component';
// import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./core/layout/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'invest', loadChildren: () => import('./features/investment/investment.module').then(m => m.InvestmentModule) },
                    { path: 'return', loadChildren: () => import('./features/return/return.module').then(m => m.ReturnModule) },
                    { path: 'createuser', loadChildren: () => import('./core/auth/admin-registration/admin-registration.module').then(m => m.AdminRegistrationModule) },
                    { path: 'client', loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule) },
                    { path: 'notification', loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule) },
                ]
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./core/auth/register/register.module').then(m => m.RegisterModule) },
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    
                    // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
