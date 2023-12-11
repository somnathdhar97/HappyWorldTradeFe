import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IInvestments, IStatusWiseInvesment } from 'src/app/core/models/Iinvesment';
import { AuthService } from 'src/app/core/services/auth.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {
  investments: IInvestments[][];
  invesmentsCouts: IStatusWiseInvesment;
  loading: boolean = true;
  selectedCard: number;
  userRole: string;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private invesmentService: InvesmentService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.allInvestments();;
    this.countInvesments();
    this.userRole = this.authService.getRole();
  }
  cardClicked(cardId: number, statusId: number) {
    this.selectedCard = (this.selectedCard == cardId) ? null : cardId;
    if (this.selectedCard != null) {
      this.investmentsByStatus(statusId);
    } else {
      this.investmentsByStatus(0);
    }

  }
  isSelected(cardId: number): boolean {
    return this.selectedCard == cardId;
  }
  countInvesments() {
    this.invesmentService.getStatusWiseInvesmentCount().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.invesmentsCouts = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  investmentsByStatus(statusId: number) {
    this.loading = true;
    this.invesmentService.getInvesmentsByStatus(statusId).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.investments = response.result;
        this.loading = false;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  allInvestments() {
    this.loading = true;
    this.invesmentService.getAllInvesments().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.investments = response.result;
        this.loading = false;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  returnPayment(investmentId: number) {
    this.router.navigate(['return', investmentId]);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
