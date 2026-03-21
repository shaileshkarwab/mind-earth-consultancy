using FluentResults;
using MediatR;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Reports.ReportService;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ImageAndMetaDataQueryHandler : IRequestHandler<ImageAndMetaDataQuery, Result<DTO_MetaDataResponse>>
    {
        private readonly IReportExcelService reportExcelService;
        private List<DTO_Excel> reportSections;
        private List<DTO_Excel> metaDataFlatObject;
        public ImageAndMetaDataQueryHandler(IReportExcelService reportExcelService)
        {
            this.reportExcelService = reportExcelService;
        }
        public Task<Result<DTO_MetaDataResponse>> Handle(ImageAndMetaDataQuery request, CancellationToken cancellationToken)
        {
            reportSections = this.reportExcelService.GetReportSections(request.fileName);
            var imageSections = this.reportExcelService.GetReportImage(reportSections);

            metaDataFlatObject = this.reportExcelService.FlatObject(reportSections.Where(c => c.WorkSheetName == "meta-data").ToList());
            var response = new DTO_MetaDataResponse
            {
                Images = imageSections,
                PageTitle = GetContentForMetaData("title"),
                KeyWords = GetContentForMetaData("key-words"),
                ReportDesc = GetContentForMetaData("report-desc"),
                ReportHeading = GetContentForMetaData("report-heading"),
                ReportUrl = GetContentForMetaData("report-url"),
                ExcelSaveFileName = request.fileName
            };
            return Task.FromResult(Result.Ok( response));
        }

        string GetContentForMetaData(string key)
        {
            string result = metaDataFlatObject.Find(c => c.Type == key).Content;
            return result;
        }
    }
}
