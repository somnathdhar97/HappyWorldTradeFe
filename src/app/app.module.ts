import { NgModule } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationComponent } from './features/notification/notification.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MenuCardComponent } from './shared/menu-card/menu-card.component';
import { ClientDashboardComponent } from './features/client-dashboard/client-dashboard.component';
import { UpdateProfileComponent } from './features/update-profile/update-profile.component';
import { AdminUserComponent } from './features/admin-user/admin-user.component';
import { AttachmentPipe } from './shared/helper/attachment.pipe';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        CountryService, CustomerService, MessageService, EventService, IconService, NodeService,
        PhotoService, ProductService, DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
