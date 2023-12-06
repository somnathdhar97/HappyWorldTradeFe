import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IInvestments, IStatusWiseInvesment } from 'src/app/core/models/Iinvesment';
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
  constructor(
    private invesmentService: InvesmentService,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.investmentsByStatus(0);
    this.countInvesments();
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
        console.log(this.invesmentsCouts);

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
}
