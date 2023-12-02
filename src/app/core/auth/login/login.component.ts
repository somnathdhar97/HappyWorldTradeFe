import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    loginForm: FormGroup;

    constructor(public layoutService: LayoutService, public fb: FormBuilder, public vs: ValidationService, public apiService: ApiService, private router: Router, private authService: AuthService) { }

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
            // this.apiService.login(this.loginForm.value).subscribe(resp => {
            //     if (resp.apiStatus == 1) {
            //         this.loginForm.reset();
            //         this.authService.setToken(resp.token);
            //         this.router.navigate(['/dashboard'])
            //     } else {
            //         this.loginForm.reset();
            //         this.loginForm.markAllAsTouched();
            //     }
            // });
            this.router.navigate(['/dashboard'])
        } else {
            this.loginForm.markAllAsTouched();
            alert("Please fill all the fields carefully..!");
        }
    }
}
