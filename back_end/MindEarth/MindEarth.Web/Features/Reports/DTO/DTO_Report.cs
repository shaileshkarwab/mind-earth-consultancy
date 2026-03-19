namespace MindEarth.Web.Features.Reports.DTO
{
    public class DTO_Report
    {

        public string? RowId { get; set; } = null!;

        public string ExcelFileName { get; set; } = null!;

        public string ExcelSaveFileName { get; set; } = null!;

        public string ReportUrlLink { get; set; } = null!;

        public bool IsActive { get; set; }

        public string? CategoryId { get; set; }

        public List<DTO_ReportImages> images { get; set; } = new List<DTO_ReportImages>();
    }

    public class DTO_ReportImages
    {
        public string Figure { get; set; }
        public string ImageName { get; set; }
        public string ImageTitle { get; set; }
        public string? SavedImageName { get; set; }

        public string RowId { get; set; }
        public bool IsImageAvailable { get; set; }

        public string ImageFullPath { get; set; }

    }
}
