import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IScheme, ITenure } from 'src/app/core/models/master';
import { MasterService } from 'src/app/core/services/master.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrls: ['./new-investment.component.scss']
})
export class NewInvestmentComponent implements OnInit {
  investmentForm: FormGroup;
  schemes: IScheme[] = [];
  tenures: ITenure[] = [];
  constructor(private fb: FormBuilder,private vs: ValidationService,private toastService: ToastService,private masterService:MasterService){}
  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      schemeName: this.vs.validation('Required', 0, 100, 100),
      tenure: this.vs.validation('Required', 0, 100, 100),
      amount: this.vs.validation('Required', 0, 100, 100),
      returnAmout: this.vs.validation('Disable', 0, 100, 100),
      rate: this.vs.validation('Required', 0, 100, 100),
      investmentDate: this.vs.validation('Required', 0, 100, 100),
    });
    this.allScheme();
    this.allTenure();
  }
  allTenure(){
    this.masterService.getTenures().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.tenures = response.result;
        
      }else{
        this.toastService.showError(response.message);
      }
    });
  }
  allScheme(){
    this.masterService.getSchemes().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.schemes = response.result;
        
      }else{
        this.toastService.showError(response.message);
      }
    });
  }
  get errorControl() {
    return this.investmentForm.controls;
  }

  submit(){
    console.log(this.investmentForm.value);

    if (this.investmentForm.valid) {
      console.log(this.investmentForm.value);
      // this.apiService.register(this.investmentForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     alert("Created successfully..!")
      //     this.investmentForm.reset();
      //     this.router.navigate(['/dashboard'])
      //   } else {
      //     this.investmentForm.reset();
      //     this.investmentForm.markAllAsTouched();
      //   }
      // });
      // this.router.navigate(['/dashboard'])
    } else {
      this.investmentForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }
}
