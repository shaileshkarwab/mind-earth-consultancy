using System.Text.Json.Serialization;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO
{
    public class DTO_CaseStudyList
    {
        public string? RowId { get; set; }

        [JsonIgnore]
        public short EntityType { get; set; }

        public string Title { get; set; } = null!;

        public string Content { get; set; } = null!;

        public string? CaseWpDate { get; set; }

        public string ImagePath { get; set; } = null!;

        public string PdfPath { get; set; } = null!;

        public string EntityTypeDesc
        {
            get
            {
                return EntityType switch
                {
                    1 => "Case Study",
                    2 => "White Paper",
                };
            }
        }
    }
}
