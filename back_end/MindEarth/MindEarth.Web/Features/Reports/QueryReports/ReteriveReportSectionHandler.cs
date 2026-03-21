using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ReteriveReportSectionHandler : IRequestHandler<ReteriveReportSection, Result<List<DTO_Excel>>>
    {
        private readonly MindEarthContext context;
        private readonly IConfiguration configuration;
        const string folderpath = "reports";
        private readonly string webPath;
        public ReteriveReportSectionHandler(MindEarthContext context, IConfiguration configuration = null)
        {
            this.context = context;
            this.configuration = configuration;
            webPath = $"{this.configuration.GetSection("AppSettings:WebPath").Get<string>()}/{folderpath}";
        }

        //public async Task<Result<List<DTO_Excel>>> Handle(ReteriveReportSection request, CancellationToken cancellationToken)
        //{
        //    var response = new List<DTO_Excel>();
        //    var result = await (from rep in this.context.Reports
        //                        join reportSection in this.context.ReportSections on rep.Id equals reportSection.ReportMasterId
        //                        where rep.ReportUrlLink == request.reportURL && reportSection.SheetName != "meta-data"
        //                        select new
        //                        {
        //                            reportSections = reportSection
        //                        }
        //                  ).ToListAsync(cancellationToken);


        //    if (result == null || !result.Any())
        //        return Result.Fail(new NoDataFound());


        //    //group the result by sheet name
        //    var groupedSheets = result.GroupBy(c => c.reportSections.SheetName).ToList();
        //    foreach (var sheet in groupedSheets)
        //    {
        //        foreach (var item in sheet)
        //        {
        //            if (item.reportSections.ParentId == 0)
        //            {
        //                response.Add(new DTO_Excel
        //                {
        //                    Content = item.reportSections.Content,
        //                    Figure = item.reportSections.Figure,
        //                    ImageName = item.reportSections.ImageName,
        //                    ImageTitle = item.reportSections.ImageTitle,
        //                    Order = item.reportSections.Order.Value,
        //                    ParentId = item.reportSections.ParentId.Value,
        //                    RowId = Convert.ToInt32(item.reportSections.SheetRowId),
        //                    SubNodes = new List<DTO_Excel>(),
        //                    Title = item.reportSections.Title,
        //                    Type = item.reportSections.Type,
        //                    WorkSheetName = item.reportSections.SheetName,
        //                    ImageFullPath = await GetImagePath(item.reportSections.ReportMasterId, item.reportSections.ImageName)
        //                });
        //            }
        //            else
        //            {
        //                var node = response.FirstOrDefault(c => c.RowId == item.reportSections.ParentId && c.WorkSheetName == sheet.Key);
        //                if (node != null)
        //                {
        //                    node.SubNodes.Add(new DTO_Excel
        //                    {
        //                        Content = item.reportSections.Content,
        //                        Figure = item.reportSections.Figure,
        //                        ImageName = item.reportSections.ImageName,
        //                        ImageTitle = item.reportSections.ImageTitle,
        //                        Order = item.reportSections.Order.Value,
        //                        ParentId = item.reportSections.ParentId.Value,
        //                        RowId = Convert.ToInt32(item.reportSections.SheetRowId),
        //                        SubNodes = new List<DTO_Excel>(),
        //                        Title = item.reportSections.Title,
        //                        Type = item.reportSections.Type,
        //                        WorkSheetName = item.reportSections.SheetName,
        //                        ImageFullPath = await GetImagePath(item.reportSections.ReportMasterId, item.reportSections.ImageName)
        //                    });
        //                }
        //            }
        //        }
        //    }

        //    if (result == null)
        //    {
        //        return Result.Fail(new NoDataFound());
        //    }
        //    //var response = result;
        //    return Result.Ok(response);
        //}



        public async Task<Result<List<DTO_Excel>>> Handle(ReteriveReportSection request, CancellationToken cancellationToken)
        {
            var result = await (
                from rep in this.context.Reports
                join reportSection in this.context.ReportSections
                    on rep.Id equals reportSection.ReportMasterId
                where rep.ReportUrlLink == request.reportURL
                      && reportSection.SheetName != "meta-data"
                select reportSection
            ).AsNoTracking().ToListAsync(cancellationToken);

            if (result == null || !result.Any())
                return Result.Fail(new NoDataFound());

            // Group by sheet
            var groupedSheets = result.GroupBy(x => x.SheetName);

            var response = new List<DTO_Excel>();

            foreach (var sheet in groupedSheets)
            {
                // Dictionary for fast lookup (RowId → DTO)
                var lookup = new Dictionary<int, DTO_Excel>();

                // Prepare tasks for parallel image path fetching
                var tasks = sheet.Select(async item =>
                {
                    var dto = new DTO_Excel
                    {
                        Content = item.Content,
                        Figure = item.Figure,
                        ImageName = item.ImageName,
                        ImageTitle = item.ImageTitle,
                        Order = item.Order ?? 0,
                        ParentId = item.ParentId ?? 0,
                        RowId = Convert.ToInt32(item.SheetRowId),
                        SubNodes = new List<DTO_Excel>(),
                        Title = item.Title,
                        Type = item.Type,
                        WorkSheetName = item.SheetName,
                        ImageFullPath = GetImagePath(item.ReportMasterId, item.ImageName)
                    };

                    return (dto, item.ParentId ?? 0);
                });

                var itemsWithDto = await Task.WhenAll(tasks);

                // Build hierarchy
                foreach (var (dto, parentId) in itemsWithDto)
                {
                    lookup[dto.RowId] = dto;

                    if (parentId == 0)
                    {
                        response.Add(dto);
                    }
                    else if (lookup.TryGetValue(parentId, out var parent))
                    {
                        parent.SubNodes.Add(dto);
                    }
                }
            }

            return Result.Ok(response);
        }


        string GetImagePath(Int32 reportId, string slideNo)
        {
            var image = this.context.ReportImages.AsNoTracking().SingleOrDefault(c => c.ReportMasterId == reportId && c.SlideNo == slideNo);
            if (image != null)
            {
                return $"{webPath}/{image.ImageUploadPath}";
            }
            return string.Empty;
        }
    }
}
