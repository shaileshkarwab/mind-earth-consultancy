using System.Globalization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MindEarth.Web.Features.Helpers
{
    public static class DateTimeHelper
    {
        public static DateOnly ConvertDateStringToDate(string inputDate)
        {
            return DateOnly.ParseExact(inputDate,"dd-MM-yyyy",CultureInfo.InvariantCulture);
        }

        public static string ConvertDateTimeToString(DateOnly date)
        {
            return date.ToString();
        }
    }
}
