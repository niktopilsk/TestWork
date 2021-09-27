import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceStatus } from '../invoice/models/invoiceStatus';

@Pipe({ name: 'invoiceStatusPipe' })
export class InvoiceStatusPipePipe implements PipeTransform {
  transform(value: InvoiceStatus): string {
    switch (value) {
      case InvoiceStatus.New:
        return 'Новый';
      case InvoiceStatus.Canceled:
        return 'Отменен';
      case InvoiceStatus.Paid:
        return 'Оплачен';
      default:
        return '';
    }
  }
}
