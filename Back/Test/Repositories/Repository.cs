using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;
using Test.Extensions;
using Test.Models;

namespace Test.Repositories
{
    public class Repository : IRepository
    {
        private readonly string _path;

        private readonly CsvConfiguration _conf = new(CultureInfo.InvariantCulture)
        {
            Delimiter = ";",
            HasHeaderRecord = false,
            DetectDelimiter = true
        };

        public Repository(string path)
        {
            _path = path;
        }

        public List<Invoice> GetAll()
        {
            using var reader = new StreamReader(_path);
            using var csvReader = new CsvReader(reader, _conf);
            var invoices = csvReader.GetRecords<Invoice>().ToList();
            return invoices;
        }

        public Invoice GetById(string id)
        {
            using var reader = new StreamReader(_path);
            using var csvReader = new CsvReader(reader, _conf);
            var invoice = csvReader.GetRecords<Invoice>().First(_ => _.Id.Equals(id));
            return invoice;
        }

        public void Add(Invoice invoice)
        {
            using var reader = new StreamWriter(_path, true);
            using var csvWriter = new CsvWriter(reader, _conf);
            csvWriter.Context.RegisterClassMap<InvoiceMap>();
            csvWriter.WriteRecord(invoice);
            csvWriter.NextRecord();
        }

        public void Remove(string id)
        {
            using var reader = new StreamReader(_path);
            using var csvReader = new CsvReader(reader, _conf);
            var invoices = csvReader.GetRecords<Invoice>().ToList();
            var invoice = invoices.Find(_ => _.Id.Equals(id));
            if (invoice == null)
            {
                throw new Exception($"Счет номер {id} не найден");
            }

            invoices.Remove(invoice);
            reader.Close();

            File.Delete(_path);
            var csv = File.Create(_path);
            csv.Close();
            using var writer = new StreamWriter(_path);
            using var csvWriter = new CsvWriter(writer, _conf);
            csvWriter.Context.RegisterClassMap<InvoiceMap>();
            csvWriter.WriteRecords(invoices);
        }

        public void Update(Invoice newInvoice)
        {
            using var reader = new StreamReader(_path);
            using var csvReader = new CsvReader(reader, _conf);
            var invoices = csvReader.GetRecords<Invoice>().ToList();
            var oldInvoice = invoices.Find(_ => _.Id.Equals(newInvoice.Id));
            reader.Close();

            if (oldInvoice == null)
            {
                throw new Exception($"Счет номер {newInvoice.Id} не найден");
            }

            oldInvoice.Update(newInvoice);

            File.Delete(_path);
            var csv = File.Create(_path);
            csv.Close();
            using var writer = new StreamWriter(_path);
            using var csvWriter = new CsvWriter(writer, _conf);
            csvWriter.Context.RegisterClassMap<InvoiceMap>();
            csvWriter.WriteRecords(invoices);
        }
    }
}