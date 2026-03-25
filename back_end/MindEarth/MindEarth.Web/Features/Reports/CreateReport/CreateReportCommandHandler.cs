using ClosedXML.Excel;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Reports.ReportService;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.Reports.CreateReport
{
    public class CreateReportCommandHandler : IRequestHandler<CreateReportCommand, Result<DTO_CreateReportReponse>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        private readonly IGenericIDService genericIDService;
        private readonly IReportExcelService reportExcelService;
        public CreateReportCommandHandler(MindEarthContext context, IUserCommonService userCommonService, IGenericIDService genericIDService, IReportExcelService reportExcelService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
            this.genericIDService = genericIDService;
            this.reportExcelService = reportExcelService;
        }
        public async Task<Result<DTO_CreateReportReponse>> Handle(CreateReportCommand request, CancellationToken cancellationToken)
        {
            var cateGoryID = await this.genericIDService.GetByIdAsync<SubCategory, Int32>(x => x.RowId == request.Report.CategoryId && x.IsActive == true, c => c.Id);
            if (cateGoryID == 0)
            {
                return Result.Fail(new BadRequestError());
            }

            //check if the report title is alreay present
            var reportExists = await this.genericIDService.GetAnyAsync<Report>(c => c.ReportUrlLink == request.Report.ReportUrlLink);
            if(reportExists)
            {
                return Result.Fail(new ValidationError($"{request.Report.ReportUrlLink} already exists"));
            }


            var rowID = Ulid.NewUlid().ToString();
            var report = new Report
            {
                CreatedAt = userCommonService.TrasnDateTime,
                CreatedBy = userCommonService.UserId,
                ExcelFileName = request.Report.ExcelFileName,
                ExcelSaveFileName = request.Report.ExcelSaveFileName,
                ReportUrlLink = request.Report.ReportUrlLink,
                SubCategoryMasterId = cateGoryID, //request.Report.SubCategoryMasterId,
                IsActive = true,
                UpdatedAt = userCommonService.TrasnDateTime,
                UpdatedBy = userCommonService.UserId,
                RowId = rowID,
                ReportDesc = request.Report.ReportDesc,
                ReportTitle = request.Report.ReportTitle,
                ReportWebImage = string.IsNullOrEmpty(request.Report.ReportWebImage) ? string.Empty : request.Report.ReportWebImage,
                ReportKeyWords = request.Report.ReportKeyWords,
                ReportWebPageTitle = request.Report.ReportWebPageTitle,
                ShowOnHomePage = request.Report.ShowOnHomePage.Value,
                PublishedDate = DateTimeHelper.ConvertDateStringToDate(request.Report.PublishedDate),
                PriceInUsd = request.Report.PriceInUsd
            };


            var rowData = reportExcelService.GetReportSections(request.Report.ExcelSaveFileName);

            //save the images
            var listImages = new List<MindEarth.Database.Entity.ReportImage>();
            var images = this.reportExcelService.GetReportImage(rowData);
            foreach (var item in images)
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
            report.ReportImages = listImages;

            // get flat objects
            var sectionObjects = this.reportExcelService.FlatObject(rowData);

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
            this.context.Reports.Add(report);
            await this.context.SaveChangesAsync();

            //set the row id for the images
            foreach (var item in images)
            {
                item.RowId = listImages.SingleOrDefault(C => C.SlideNo == item.ImageName).RowId;
            }

            return Result.Ok(new DTO_CreateReportReponse
            {
                ReportId = rowID,
                Images = images
            });
        }
    }
}
