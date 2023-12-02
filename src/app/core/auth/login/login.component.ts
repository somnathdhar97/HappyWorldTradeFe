import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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

    valCheck: string[] = ['remember'];

    loginForm: FormGroup;

    constructor(public layoutService: LayoutService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    login() {
        console.log(this.loginForm.value);
    }
}
