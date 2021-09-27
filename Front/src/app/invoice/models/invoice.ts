import { InvoiceStatus } from './invoiceStatus';
import { PaymentMethod } from './paymentMethod';

export class Invoice {
  constructor(public lastEditionTime?: string,
              public id?: string,
              public status: InvoiceStatus = InvoiceStatus.New,
              public price?: number,
              public paymentMethod?: PaymentMethod) {
  }

  isEqual(oldInvoice: Invoice) {
    return this.status === oldInvoice.status &&
      this.price == oldInvoice.price &&
      this.paymentMethod == oldInvoice.paymentMethod &&
      this.id === oldInvoice.id;
  }
}
