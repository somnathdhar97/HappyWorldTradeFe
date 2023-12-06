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
                    label: 'Create',
                    items: [
                        { label: 'Create User', icon: 'pi pi-fw pi-user-plus', routerLink: ['createuser'] },
                        { label: 'Create notice', icon: 'pi pi-fw pi-bell', routerLink: ['notification'] }
                    ]
                },
                {
                    label: 'Invest',
                    items: [
                        { label: 'Invest Money', icon: 'pi pi-fw pi-dollar', routerLink: ['invest'] }
                    ]
                },
                {
                    label: 'Return',
                    items: [
                        { label: 'Return Payment', icon: 'pi pi-fw pi-caret-left', routerLink: ['return'] }
                    ]
                }
            ];
        } else if (this.authService.getRole() == 'client') {
            this.model = [
                {
                    label: 'Invest',
                    items: [
                        { label: 'Invest Money', icon: 'pi pi-fw pi-dollar', routerLink: ['invest'] }
                    ]
                }
            ];
        }
    }
}