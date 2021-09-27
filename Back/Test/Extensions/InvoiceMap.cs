using CsvHelper.Configuration;
using Test.Models;

namespace Test.Extensions
{
    public class InvoiceMap : ClassMap<Invoice>
    {
        public InvoiceMap()
        {
            Map(m => m.LastEditionTime);
            Map(m => m.Id);
            Map(m => m.Status).TypeConverter<EnumConverter<InvoiceStatus>>();
            Map(m => m.Price);
            Map(m => m.PaymentMethod).TypeConverter<EnumConverter<PaymentMethod>>();
        }
    }
}