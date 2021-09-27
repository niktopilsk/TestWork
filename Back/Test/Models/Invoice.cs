using System;

namespace Test.Models
{
    public class Invoice
    {
        public DateTime LastEditionTime { get; set; } = DateTime.Now;
        public string Id { get; set; }
        public InvoiceStatus Status { get; set; } = InvoiceStatus.New;
        public decimal Price { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public void Update(Invoice newInvoince)
        {
            LastEditionTime = DateTime.Now;
            Status = newInvoince.Status;
            Price = newInvoince.Price;
            PaymentMethod = newInvoince.PaymentMethod;
        }
    }
}