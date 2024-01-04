import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  payDetails: any;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.payDetails = this.config.data;
  }
}
