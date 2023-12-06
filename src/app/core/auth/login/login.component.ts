import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILogincredentials } from '../../models/iauth';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {
    logingcredentials: ILogincredentials;
    loginForm: FormGroup;

    constructor(private toastService: ToastService, public layoutService: LayoutService, public fb: FormBuilder, public vs: ValidationService, public apiService: ApiService, private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName: this.vs.validation('Required', 0, 100, 100),
            password: this.vs.validation('Required', 0, 100, 100),
        })
    }

    get errorControl() {
        return this.loginForm.controls;
    }

    login() {
        if (this.loginForm.valid) {
            this.logingcredentials = {
                username: this.loginForm.value.userName,
                password: this.loginForm.value.password
            };
            this.authService.userLogin(this.logingcredentials).subscribe((response) => {
                if (response.apiResponseStatus == 1) {
                    this.authService.setToken(response.result);
                    this.toastService.showSuccess(response.message);
                    this.router.navigate(['/']);
                } else {
                    this.toastService.showError(response.message);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
            this.toastService.showError("Please fill all the fields carefully..!");
        }
    }
}
