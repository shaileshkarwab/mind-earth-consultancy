using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.ReportService
{
    public interface IReportExcelService
    {
        List<DTO_Excel> GetReportSections(string fileName);

        List<DTO_ReportImage> GetReportImage(List<DTO_Excel> excelData);

        List<DTO_Excel> FlatObject(List<DTO_Excel> _rowData);
    }
}
