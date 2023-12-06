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

  // constructor(public layoutService: LayoutService, private authService: AuthService) {
  // }
  constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) {
  }
  logOut() {
    this.authService.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
