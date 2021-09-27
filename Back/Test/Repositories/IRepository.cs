using System.Collections.Generic;
using Test.Models;

namespace Test.Repositories
{
    public interface IRepository
    {
        List<Invoice> GetAll();
        Invoice GetById(string id);
        void Add(Invoice invoice);
        void Remove(string id);
        void Update(Invoice newInvoice);
    }
}