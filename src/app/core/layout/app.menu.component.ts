import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {
        if (this.authService.getRole() == 'admin') {
            this.model = [
                {
                    label: 'Admin User',
                    items: [
                        { label: 'Manage Admin Users', icon: 'pi pi-fw pi-user-plus', routerLink: ['admin-user'] },
                    ]
                },
                {
                    label: 'Client',
                    items: [
                        { label: 'Manage Clients', icon: 'pi pi-fw pi-dollar', routerLink: ['client'] }
                    ]
                },
                {
                    label: 'Investment',
                    items: [
                        { label: 'Manage Investments', icon: 'pi pi-fw pi-dollar', routerLink: ['invest'] }
                    ]
                },
                {
                    label: 'Notification',
                    items: [
                        { label: 'Manage Notifications', icon: 'pi pi-fw pi-bell', routerLink: ['notification'] }
                    ]
                }
            ];
        } else if (this.authService.getRole() == 'client') {
            this.model = [
                {
                    label: 'Investment',
                    items: [
                        { label: 'Investments', icon: 'pi pi-fw pi-dollar', routerLink: ['invest'] }
                    ]
                }
            ];
        }
    }
}