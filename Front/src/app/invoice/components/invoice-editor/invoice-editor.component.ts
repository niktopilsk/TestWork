import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Invoice} from '../../models/invoice';
import { takeUntil } from 'rxjs/operators';
import { DataSourceService } from '../../services/data-source.service';
import { InvoiceStatus } from '../../models/invoiceStatus';
import { PaymentMethod } from '../../models/paymentMethod';

@Component({
  selector: 'invoice-invoice-editor',
  templateUrl: './invoice-editor.component.html',
  styleUrls: ['./invoice-editor.component.css']
})
export class InvoiceEditorComponent implements OnInit, OnDestroy {
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
  }

  get submitDisabled() {
    return this.pendingRequest ||
      this.form.form.invalid ||
      this.invoice.status === undefined ||
      this.invoice.id === undefined ||
      this.invoice.price === undefined ||
      this.invoice.paymentMethod === undefined ||
      this.invoice.isEqual(this.dialogData.oldInvoice);
  }

  ngOnInit(): void {
    this.clear();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  edit() {
    this.setPendingRequest(true);
    this.dataSource.update(this.invoice)
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
    Object.assign(this.invoice, this.dialogData?.oldInvoice);
    this.errorMessage = '';
  }

  private setPendingRequest(value: boolean) {
    this.pendingRequest = value;
    this.dialogRef.disableClose = value;
  }
}
