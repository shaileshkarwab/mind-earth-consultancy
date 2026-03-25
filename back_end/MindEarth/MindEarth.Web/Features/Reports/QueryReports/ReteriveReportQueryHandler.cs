using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ReteriveReportQueryHandler : IRequestHandler<ReteriveReportQuery, Result<DTO_Report>>
    {
        private readonly MindEarthContext context;
        private readonly IConfigParamService configuration;
        public ReteriveReportQueryHandler(MindEarthContext context, IConfigParamService configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }
        public async Task<Result<DTO_Report>> Handle(ReteriveReportQuery request, CancellationToken cancellationToken)
        {
            var report = await this.context.Reports.Include(c => c.SubCategoryMaster).Include(c => c.ReportImages).SingleOrDefaultAsync(c => c.RowId == request.reportId);
            if (report == null)
            {
                return Result.Fail(new NoDataFound());
            }
            var reportImageWebPath = this.configuration.GetWebPath();
            var resonse = new DTO_Report
            {
                CategoryId = report.SubCategoryMaster.RowId,
                ExcelFileName = report.ExcelFileName,
                IsActive = report.IsActive,
                ReportUrlLink = report.ReportUrlLink,
                RowId = report.RowId,
                ReportDesc = report.ReportDesc,
                ReportTitle = report.ReportTitle,
                ReportWebImage = $"{reportImageWebPath}/reports/{report.ReportWebImage}",
                ExcelSaveFileName = report.ExcelSaveFileName,
                ReportKeyWords = report.ReportKeyWords,
                ReportWebPageTitle = report.ReportWebPageTitle,
                ShowOnHomePage = report.ShowOnHomePage,
                PublishedDate = DateTimeHelper.ConvertDateTimeToString(report.PublishedDate.Value),
                PriceInUsd = report.PriceInUsd
            };

            foreach (var image in report.ReportImages)
            {
                resonse.images.Add(new DTO_ReportImages
                {
                    Figure = image.FigureNo,
                    ImageName = image.SlideNo,
                    ImageTitle = image.ImageTitle,
                    RowId = image.RowId,
                    SavedImageName = image.ImageUploadPath,
                    IsImageAvailable = CheckForImage(image.ImageUploadPath),
                    ImageFullPath = $"{reportImageWebPath}/reports/{image.ImageUploadPath}"
                });
            }
            return resonse;
        }

        bool CheckForImage(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return false;
            }

            //check if the report image exists
            var currentWebPath = Directory.GetCurrentDirectory();
            var imageFilePath = $"{currentWebPath}/uploaddata/reports/{filePath}";
            return System.IO.File.Exists(imageFilePath);
        }
    }


}
