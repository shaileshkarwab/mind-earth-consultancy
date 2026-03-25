using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Reports.ReportService;
using MindEarth.Web.Features.Services;
using static System.Net.Mime.MediaTypeNames;

namespace MindEarth.Web.Features.Reports.UpdateReport
{
    public class UpdateReportCommandHandler : IRequestHandler<UpdateReportCommand, Result<DTO_CreateReportReponse>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        private readonly IReportExcelService reportExcelService;
        private readonly string reportImageWebPath;
        private readonly IConfigParamService configuration;
        public UpdateReportCommandHandler(MindEarthContext context, IUserCommonService userCommonService, IReportExcelService reportExcelService, IConfigParamService configuration)
        {
            this.context = context;
            this.userCommonService = userCommonService;
            this.reportExcelService = reportExcelService;
            this.configuration = configuration;
            reportImageWebPath = this.configuration.GetWebPath();
        }
        public async Task<Result<DTO_CreateReportReponse>> Handle(UpdateReportCommand request, CancellationToken cancellationToken)
        {

            //checking
            var report = await this.context.Reports.SingleOrDefaultAsync(c => c.RowId == request.reportID && c.IsActive == true);
            if (report == null)
            {
                return Result.Fail(new NoDataFound());
            }



            //remove the report sections
            var delReportSections = await this.context.ReportSections.Where(s => s.ReportMasterId == report.Id).ToListAsync();
            this.context.RemoveRange(delReportSections);

            report.UpdatedBy = this.userCommonService.UserId;
            report.UpdatedAt = this.userCommonService.TrasnDateTime;
            report.ExcelFileName = string.IsNullOrEmpty(request.Report.ExcelFileName) ? report.ExcelFileName : request.Report.ExcelFileName;
            report.ExcelSaveFileName = string.IsNullOrEmpty(request.Report.ExcelSaveFileName) ? report.ExcelSaveFileName : request.Report.ExcelSaveFileName;
            report.ReportUrlLink = request.Report.ReportUrlLink;
            report.IsActive = request.Report.IsActive;
            report.ReportDesc = request.Report.ReportDesc;
            report.ReportTitle = request.Report.ReportTitle;
            report.ReportWebImage = string.IsNullOrEmpty(request.Report.ReportWebImage) ? report.ReportWebImage : request.Report.ReportWebImage;
            report.ReportWebPageTitle = request.Report.ReportWebPageTitle;
            report.ReportKeyWords = request.Report.ReportKeyWords;
            report.ShowOnHomePage = request.Report.ShowOnHomePage.Value;
            report.PublishedDate = DateTimeHelper.ConvertDateStringToDate(request.Report.PublishedDate);
            report.PriceInUsd = request.Report.PriceInUsd;
            //
            var reportSections = new List<DTO_Excel>();
            if (!string.IsNullOrEmpty(request.Report.ExcelSaveFileName))
                reportSections = this.reportExcelService.GetReportSections(request.Report.ExcelSaveFileName);
            var reportImages = this.reportExcelService.GetReportImage(reportSections);

            //save the new images added if any
            var existingSlides = this.context.ReportImages.Where(c => c.ReportMasterId == report.Id).Select(c => c.SlideNo).ToList();
            var newReportImages = reportImages.Where(c => !existingSlides.Contains(c.ImageName)).ToList();

            var listImages = new List<MindEarth.Database.Entity.ReportImage>();
            foreach (var item in newReportImages)
            {
                listImages.Add(new MindEarth.Database.Entity.ReportImage
                {
                    CreatedAt = userCommonService.TrasnDateTime,
                    CreatedBy = userCommonService.UserId,
                    UpdatedAt = userCommonService.TrasnDateTime,
                    UpdatedBy = userCommonService.UserId,
                    FigureNo = item.Figure,
                    ImageTitle = item.ImageTitle,
                    SlideNo = item.ImageName,
                    RowId = Ulid.NewUlid().ToString(),
                });
            }
            if (listImages.Count > 0)
                report.ReportImages = listImages;


            //save the sections
            var sectionObjects = this.reportExcelService.FlatObject(reportSections);
            foreach (var section in sectionObjects)
            {
                report.ReportSections.Add(new ReportSection
                {
                    Content = section.Content,
                    CreatedAt = this.userCommonService.TrasnDateTime,
                    CreatedBy = this.userCommonService.UserId,
                    UpdatedAt = this.userCommonService.TrasnDateTime,
                    Figure = section.Figure,
                    ImageName = section.ImageName,
                    ImageTitle = section.ImageTitle,
                    Order = section.Order,
                    ParentId = section.ParentId,
                    RowId = Ulid.NewUlid().ToString(),
                    SheetName = section.WorkSheetName,
                    SheetRowId = section.RowId,
                    Title = section.Title,
                    Type = section.Type,
                });
            }

            this.context.Reports.Update(report);
            await this.context.SaveChangesAsync();

            return Result.Ok(new DTO_CreateReportReponse
            {
                ReportId = request.reportID,
                Images = GetReportImages(request.reportID)
            });
        }

        List<DTO_ReportImage> GetReportImages(string rowID)
        {
            var reportImages = (from img in this.context.ReportImages
                                join rep in this.context.Reports on img.ReportMasterId equals rep.Id
                                where rep.RowId == rowID
                                select new DTO_ReportImage
                                {
                                    Figure = img.FigureNo,
                                    ImageName = img.SlideNo,
                                    ImageTitle = img.ImageTitle,
                                    SavedImageName = img.ImageUploadPath,
                                    RowId = img.RowId,
                                    IsImageAvailable = FileHandler.IsFileAvailable($"reports/{img.ImageUploadPath}"),
                                    ImageFullPath = $"{reportImageWebPath}/reports/{img.ImageUploadPath}"

                                }
                                ).ToList();

            return reportImages;
        }
    }
}
