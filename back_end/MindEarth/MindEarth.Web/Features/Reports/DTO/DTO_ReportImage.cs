namespace MindEarth.Web.Features.Reports.DTO
{
    public class DTO_ReportImage
    {
        public string ImageName { get; set; }
        public string Figure { get; set; }
        public string ImageTitle { get; set; }
        public string SavedImageName { get; set; }

        public string RowId { get; set; }
    }

    public class DTO_CreateReportReponse
    {
        public string ReportId { get; set; }
        public List<DTO_ReportImage> Images { get; set; } = new List<DTO_ReportImage>();
    }
}
