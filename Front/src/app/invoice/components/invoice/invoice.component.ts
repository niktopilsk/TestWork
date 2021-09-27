import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSourceService } from '../../services/data-source.service';
import { Invoice } from '../../models/invoice';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceEditorComponent } from '../invoice-editor/invoice-editor.component';
import { InvoiceAdderComponent } from '../invoice-adder/invoice-adder.component';

@Component({
  selector: 'invoice-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  displayedColumns = ['id', 'lastEditionTime', 'status', 'price', 'paymentMethod', 'buttons'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private unsubscribeSubject = new Subject<void>();

  constructor(private dataSourceService: DataSourceService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSourceService.getAll();
    this.dataSourceService.invoice
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(_ => {
        this.dataSource.data = _;
      });
    this.dataSource.sort = this.sort;
  }

  removeInvoice(id: string) {
    this.dataSourceService.remove(id)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => {
      }, error => {
        console.error(error);
        this.dataSourceService.getAll();
      }, () => {
        this.dataSourceService.getAll();
      });
  }

  editInvoice(invoice: Invoice) {
    this.dialog.open(InvoiceEditorComponent, {
      data: {
        oldInvoice: invoice
      }
    });
  }

  addInvoice() {
    this.dialog.open(InvoiceAdderComponent);
  }
}
