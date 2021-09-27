using System;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;

namespace Test.Extensions
{
    public class EnumConverter<T> : EnumConverter where T : struct
    {
        public EnumConverter() : base(typeof(T))
        {
        }

        public override string ConvertToString(object o, IWriterRow row, MemberMapData memberMapData)
        {
            return Enum.TryParse<T>(o.ToString(), out var result)
                ? (Convert.ToInt32(result)).ToString()
                : base.ConvertToString(o, row, memberMapData);
        }

        public override object ConvertFromString(string s, IReaderRow row, MemberMapData memberMapData)
        {
            if (int.TryParse(s, out var parsedValue))
            {
                return (T)(object)parsedValue;
            }

            return base.ConvertFromString(s, row, memberMapData);
        }
    }
}