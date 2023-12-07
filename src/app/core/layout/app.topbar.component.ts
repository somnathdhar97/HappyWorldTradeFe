import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
// import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  breadcrumbItems: MenuItem[] = [];
  private subscription: Subscription;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  decodedToken: string;
  userRole: string;
  userName: string;
  userId: string;

  // constructor(public layoutService: LayoutService, private authService: AuthService) {
  // }
  constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) {
    this.decodedToken = this.authService.getDecodedAccessToken();
    this.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userName = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  logOut() {
    this.authService.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
