import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ValidationObj } from 'app/helper/patternValidation';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    constructor() {}

    validation(pattern: string, min: number, max: number, optional: any): any {
        switch (pattern) {
            case 'Required':
                return ['', Validators.required];

            case 'Amount':
                return ['', [Validators.required, Validators.pattern(ValidationObj.amount.pattern)]];

            case 'Disable':
                return [{ value: '', disabled: true }, [Validators.required]];

            case 'Not Required':
                return ['', Validators.compose([Validators.minLength(min), Validators.maxLength(max)])];

            case 'Email':
                return ['', Validators.compose([Validators.required, Validators.email])];

            case 'null':
                return [null];

            case 'Not Required with Pattern':
                return ['', Validators.compose([Validators.pattern(optional), Validators.minLength(min), Validators.maxLength(max)])];

            case 'Not Required with zero':
                return [0, Validators.compose([Validators.pattern(optional), Validators.minLength(min), Validators.maxLength(max)])];

            case 'Required Digit':
                return ['', [Validators.required, Validators.pattern(/^\d{10}$/)]];

            case 'Not Required Digit':
                return ['', [Validators.pattern(/^[0-9]*$/)]];
            case 'No Special Character Allowed':
                return ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])];

            default:
                return ['', Validators.compose([Validators.required, Validators.pattern(pattern), Validators.minLength(min), Validators.maxLength(max)])];
        }
    }

    // *****check the error in thr from control*****
    getValidatorErrorMessage(validatorName: string, validatorValue?: any): any {
        const differnceInMaxLength = validatorValue.actualLength - validatorValue.requiredLength;
        const differnceInMinLength = validatorValue.requiredLength - validatorValue.actualLength;
        const maximumValueAllowed = validatorValue.max;

        if (validatorName === 'pattern') {
            const pattern = validatorValue.requiredPattern;
            const entry = Object.entries(ValidationObj).filter((val: any) => {
                val = val[1];
                if (val.pattern == pattern) return val.errorMsg;
            });
            return entry[0][1].errorMsg;
        }

        const config = {
            required: '* Required Field *',
            pattern: 'Invalid character entered.',
            minlength: `Please enter ${differnceInMinLength} more characters`,
            maxlength: `You have entered ${differnceInMaxLength} more characters than allowed.`,
            email: 'Invalid email address',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            wrongLTForm: 'IF TOTAL LOAD ABOVE 100kW, PLEASE FILL HT FORM',
            wrongHTForm: 'IF TOTAL LOAD BELOW 100kW, PLEASE FILL LT FORM',
            max: `Invalid value. Cannot be more than ${maximumValueAllowed}`,
        };
        return config[validatorName as keyof typeof config];
    }
}
