import { ValidationService } from '../../../core/services/validation.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'custom-mat-error',
    templateUrl: './custom-mat-error.component.html',
    styleUrls: ['./custom-mat-error.component.scss'],
})
export class CustomMatErrorComponent{

    @Input() control!: AbstractControl;

    constructor(private validationService: ValidationService) {}

    get errorMessage(): any {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}
