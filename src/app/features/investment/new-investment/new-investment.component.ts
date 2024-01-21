import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IInsertInvestment } from 'src/app/core/models/Iinvesment';
import { IInvestment, IPaymentMethod, IScheme, ITenure, IUser } from 'src/app/core/models/master';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrls: ['./new-investment.component.scss']
})
export class NewInvestmentComponent implements OnInit {
  investmentForm: FormGroup;
  investmentData: IInsertInvestment;
  schemes: IScheme[] = [];
  tenures: ITenure[] = [];
  users: IUser[] = [];
  paymentMethods: IPaymentMethod[] = [];

  decodedToken: string;
  userRole: string;
  userName: string;
  userId: string;
  selectedFile: File = null;
  paymentJson: any;


  constructor(private fb: FormBuilder,
    private vs: ValidationService,
    private toastService: ToastService,
    private masterService: MasterService,
    private invesmentService: InvesmentService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.decodedToken = this.authService.getDecodedAccessToken();
    this.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userName = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      userName: this.vs.validation('Required', 0, 100, 100),
      scheme: this.vs.validation('Required', 0, 100, 100),
      tenure: this.vs.validation('Required', 0, 100, 100),
      amount: this.vs.validation('Required', 0, 100, 100),
      returnAmout: this.vs.validation('Disable', 0, 100, 100),
      rate: this.vs.validation('Required', 0, 100, 100),
      paymentMethod: this.vs.validation('Required', 0, 100, 100),
      // documentNo: this.vs.validation('Required', 0, 100, 100),
      investmentDate: this.vs.validation('Required', 0, 100, 100),
      remarks: this.vs.validation('Required', 0, 100, 100),

      //Common formControls
      name: [],
      mobile: [],
      transactionId: [],
      // uploadFile: [],

      //Only for UPI
      fromUpi: [],
      toUpi: [],

      //Only for NEFT
      fromBank: [],
      toBank: [],
      neftRef: [],

      //Only for Cheque
      toWhom: [],
      chequeFromBank: [],
      chequeNo: [],
      chequeDatedOn: [],
    });
    this.allScheme();
    this.allTenure();
    if (this.userRole == 'admin') {
      this.allUser();
    } else if (this.userRole == 'client') {
      this.investmentForm.controls['userName'].clearValidators();
      this.investmentForm.controls['userName'].updateValueAndValidity();
      this.investmentForm.controls['rate'].clearValidators();
      this.investmentForm.controls['rate'].updateValueAndValidity();
    }
    this.allPaymentMethod();
  }

  allTenure() {
    this.masterService.getTenures().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tenures = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allScheme() {
    this.masterService.getSchemes().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.schemes = response.result;

      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allUser() {
    this.masterService.getUsers().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.users = response.result;

      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allPaymentMethod() {
    this.masterService.getPaymentMethods().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.paymentMethods = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  get errorControl() {
    return this.investmentForm.controls;
  }

  get formControlValues() {
    return this.investmentForm.value;
  }

  uploadFile(event: any) {
    if (event.files[0]) {
      this.selectedFile = event.files[0];
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
  }

  onMethodSelect(e: any) {
    if (e.value.name == 'UPI') {

      // Adding Validations dynamically for UPI......
      this.investmentForm.controls['fromUpi'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['toUpi'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['transactionId'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['name'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['mobile'].addValidators(Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]));
      this.investmentForm.controls['fromUpi'].updateValueAndValidity();
      this.investmentForm.controls['toUpi'].updateValueAndValidity();
      this.investmentForm.controls['transactionId'].updateValueAndValidity();
      this.investmentForm.controls['name'].updateValueAndValidity();
      this.investmentForm.controls['mobile'].updateValueAndValidity();

      // Removing validations dynamically for Cheque......
      this.investmentForm.controls['toWhom'].clearValidators();
      this.investmentForm.controls['toWhom'].updateValueAndValidity();
      this.investmentForm.controls['chequeFromBank'].clearValidators();
      this.investmentForm.controls['chequeFromBank'].updateValueAndValidity();
      this.investmentForm.controls['chequeNo'].clearValidators();
      this.investmentForm.controls['chequeNo'].updateValueAndValidity();
      this.investmentForm.controls['chequeDatedOn'].clearValidators();
      this.investmentForm.controls['chequeDatedOn'].updateValueAndValidity();

      // Removing validations dynamically for NEFT......
      this.investmentForm.controls['fromBank'].clearValidators();
      this.investmentForm.controls['fromBank'].updateValueAndValidity();
      this.investmentForm.controls['toBank'].clearValidators();
      this.investmentForm.controls['toBank'].updateValueAndValidity();
      this.investmentForm.controls['neftRef'].clearValidators();
      this.investmentForm.controls['neftRef'].updateValueAndValidity();

    } else if (e.value.name == 'NEFT') {

      // Adding Validations dynamically for NEFT......
      this.investmentForm.controls['fromBank'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['fromBank'].updateValueAndValidity();
      this.investmentForm.controls['toBank'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['toBank'].updateValueAndValidity();
      this.investmentForm.controls['neftRef'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['neftRef'].updateValueAndValidity();
      this.investmentForm.controls['name'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['name'].updateValueAndValidity();
      this.investmentForm.controls['mobile'].addValidators(Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]));
      this.investmentForm.controls['mobile'].updateValueAndValidity();

      // Removing validations dynamically for UPI......
      this.investmentForm.controls['fromUpi'].clearValidators();
      this.investmentForm.controls['fromUpi'].updateValueAndValidity();
      this.investmentForm.controls['toUpi'].clearValidators();
      this.investmentForm.controls['toUpi'].updateValueAndValidity();

      // Removing validations dynamically for Cheque......
      this.investmentForm.controls['toWhom'].clearValidators();
      this.investmentForm.controls['toWhom'].updateValueAndValidity();
      this.investmentForm.controls['chequeFromBank'].clearValidators();
      this.investmentForm.controls['chequeFromBank'].updateValueAndValidity();
      this.investmentForm.controls['chequeNo'].clearValidators();
      this.investmentForm.controls['chequeNo'].updateValueAndValidity();
      this.investmentForm.controls['chequeDatedOn'].clearValidators();
      this.investmentForm.controls['chequeDatedOn'].updateValueAndValidity();

      // Removing validations dynamically for Transaction ID......
      this.investmentForm.controls['transactionId'].clearValidators();
      this.investmentForm.controls['transactionId'].updateValueAndValidity();

    } else if (e.value.name == 'Cheque') {

      // Adding Validations dynamically for Cheque......
      this.investmentForm.controls['toWhom'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['toWhom'].updateValueAndValidity();
      this.investmentForm.controls['chequeFromBank'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['chequeFromBank'].updateValueAndValidity();
      this.investmentForm.controls['chequeNo'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['chequeNo'].updateValueAndValidity();
      this.investmentForm.controls['chequeDatedOn'].addValidators(Validators.compose([Validators.required]));
      this.investmentForm.controls['chequeDatedOn'].updateValueAndValidity();

      // Removing validations dynamically for UPI......
      this.investmentForm.controls['fromUpi'].clearValidators();
      this.investmentForm.controls['fromUpi'].updateValueAndValidity();
      this.investmentForm.controls['toUpi'].clearValidators();
      this.investmentForm.controls['toUpi'].updateValueAndValidity();

      // Removing validations dynamically for NEFT......
      this.investmentForm.controls['fromBank'].clearValidators();
      this.investmentForm.controls['fromBank'].updateValueAndValidity();
      this.investmentForm.controls['toBank'].clearValidators();
      this.investmentForm.controls['toBank'].updateValueAndValidity();
      this.investmentForm.controls['neftRef'].clearValidators();
      this.investmentForm.controls['neftRef'].updateValueAndValidity();

      // Removing validations dynamically for Transaction ID......
      this.investmentForm.controls['transactionId'].clearValidators();
      this.investmentForm.controls['transactionId'].updateValueAndValidity();

      // Removing validations dynamically for Name......
      this.investmentForm.controls['name'].clearValidators();
      this.investmentForm.controls['name'].updateValueAndValidity();

      // Removing validations dynamically for Mobile......
      this.investmentForm.controls['mobile'].clearValidators();
      this.investmentForm.controls['mobile'].updateValueAndValidity();
    }
  }

  submit() {
    if (this.investmentForm.valid) {
      if (this.investmentForm.value.paymentMethod.id == 1) {
        // UPI
        this.paymentJson = {
          fromUpi: this.investmentForm.value['fromUpi'],
          toUpi: this.investmentForm.value['toUpi'],
          transactionId: this.investmentForm.value['transactionId'],
          name: this.investmentForm.value['name'],
          mobile: this.investmentForm.value['mobile']
        };
      } else if (this.investmentForm.value.paymentMethod.id == 2) {
        // NEFT
        this.paymentJson = {
          fromBank: this.investmentForm.value['fromBank'],
          toBank: this.investmentForm.value['toBank'],
          neftRef: this.investmentForm.value['neftRef'],
          name: this.investmentForm.value['name'],
          mobile: this.investmentForm.value['mobile']
        };
      } else if (this.investmentForm.value.paymentMethod.id == 3) {
        // Cheque
        this.paymentJson = {
          toWhom: this.investmentForm.value['toWhom'],
          chequeFRomBank: this.investmentForm.value['chequeFromBank'],
          chequeNo: this.investmentForm.value['chequeNo'],
          chequeDatedOn: this.investmentForm.value['chequeDatedOn']
        };
      }
      this.investmentData = {
        userId: this.userRole == 'admin' ? this.investmentForm.value.userName.id : this.userRole == 'client' ? this.userId : '',
        schemeId: this.investmentForm.value.scheme.id,
        tenureId: this.investmentForm.value.tenure.id,
        amount: this.investmentForm.value.amount,
        ratePer: this.userRole == 'admin' ? this.investmentForm.value.rate : this.userRole == 'client' ? 1 : 1,
        paymentMethodId: this.investmentForm.value.paymentMethod.id,
        // paymentMethodDoc: this.investmentForm.value.documentNo,
        investmentDate: this.datePipe.transform(this.investmentForm.value.investmentDate, 'dd/MM/yyyy'),
        SchemeValue: this.investmentForm.value.scheme.value,
        TenureValue: this.investmentForm.value.tenure.value,
        Remarks: this.investmentForm.value.remarks
      }
      this.invesmentService.setNewInvesment(this.investmentData, this.paymentJson, this.selectedFile).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['/invest']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.investmentForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }
}
