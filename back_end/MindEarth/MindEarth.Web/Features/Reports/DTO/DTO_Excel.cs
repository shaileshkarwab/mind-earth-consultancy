using DocumentFormat.OpenXml.Drawing.Spreadsheet;

namespace MindEarth.Web.Features.Reports.DTO
{
    public class DTO_Excel
    {
        public Int32 RowId { get; set; }
        public Int32 ParentId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public Int32 Order { get; set; }
        public string ImageName { get; set; }
        public string Figure { get; set; }
        public string ImageTitle { get; set; }

        public string WorkSheetName { get; set; }

        public string ImageFullPath { get; set; }

        public List<DTO_Excel> SubNodes { get; set; } = new List<DTO_Excel>();

    }
        
}
