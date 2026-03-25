using DocumentFormat.OpenXml.ExtendedProperties;

namespace MindEarth.Web.Features.Reports.DTO
{
    public class DTO_MetaDataResponse
    {
        public string ReportUrl { get; set; }
        public string ReportHeading { get; set; }
        public string ReportDesc { get; set; }
        public string KeyWords { get; set; }
        public string PageTitle { get; set; }

        public string ExcelSaveFileName { get; set; }
        public List<DTO_ReportImage> Images  { get; set; }

    }
}
