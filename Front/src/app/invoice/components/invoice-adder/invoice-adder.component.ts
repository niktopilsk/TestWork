import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Invoice} from '../../models/invoice';
import { DataSourceService } from '../../services/data-source.service';
import { takeUntil } from 'rxjs/operators';
import { InvoiceStatus } from '../../models/invoiceStatus';
import { PaymentMethod } from '../../models/paymentMethod';

@Component({
  selector: 'invoice-invoice-adder',
  templateUrl: './invoice-adder.component.html',
  styleUrls: ['./invoice-adder.component.css']
})
export class InvoiceAdderComponent implements OnInit, OnDestroy {
  invoice = new Invoice();
  pendingRequest = false;
  errorMessage: string;
  @ViewChild('form', { static: true }) form: NgForm;
  statuses = Object.keys(InvoiceStatus).filter(k => !isNaN(Number(k))).map(Number);
  payments = Object.keys(PaymentMethod).filter(k => !isNaN(Number(k))).map(Number);
  private unsubscribeSubject = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,
              private dialogRef: MatDialogRef<any>,
              private dataSource: DataSourceService) {
    this.clear();
  }

  get submitDisabled() {
    return this.pendingRequest ||
      this.form.form.invalid ||
      this.invoice.id === undefined ||
      this.invoice.price === undefined ||
      this.invoice.paymentMethod === undefined;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  add() {
    this.setPendingRequest(true);
    this.dataSource.add(this.invoice)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => {
        },
        error => {
          this.errorMessage = error;
          this.dataSource.getAll();
          this.setPendingRequest(false);
        },
        () => {
          this.dataSource.getAll();
          this.setPendingRequest(false);
          this.dialogRef.close();
        });
  }

  clear() {
    Object.assign(this.invoice, new Invoice());
    this.errorMessage = '';
  }

  private setPendingRequest(value: boolean) {
    this.pendingRequest = value;
    this.dialogRef.disableClose = value;
  }
}
