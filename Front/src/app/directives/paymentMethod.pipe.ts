import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '../invoice/models/paymentMethod';

@Pipe({ name: 'invoicePaymentPipe' })
export class InvoicePaymentPipePipe implements PipeTransform {
  transform(value: PaymentMethod): string {
    switch (value) {
      case PaymentMethod.DebitCard:
        return 'Дебетовая карта';
      case PaymentMethod.ElectronicCheck:
        return 'Электронный чек';
      case PaymentMethod.CreditCard:
        return 'Кредитная карта';
      default:
        return '';
    }
  }

}
