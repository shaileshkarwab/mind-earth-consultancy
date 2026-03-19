namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO
{
    public class DTO_ManageCaseStudyWhitePaper
    {

        public string? RowId { get; set; }

        public short EntityType { get; set; }

        public string Title { get; set; } = null!;

        public string Content { get; set; } = null!;

        public string? CaseWpDate { get; set; }

        public string? ImagePath { get; set; } = null!;

        public string? PdfPath { get; set; } = null!;

    }
}
