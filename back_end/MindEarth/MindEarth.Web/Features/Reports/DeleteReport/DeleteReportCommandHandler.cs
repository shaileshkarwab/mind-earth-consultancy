using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.Reports.DeleteReport
{
    public class DeleteReportCommandHandler : IRequestHandler<DeleteReportCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        public DeleteReportCommandHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<bool>> Handle(DeleteReportCommand request, CancellationToken cancellationToken)
        {
            var report = await this.context.Reports.Include(c => c.ReportImages).Include(c=>c.ReportSections).SingleOrDefaultAsync(c => c.RowId == request.reportId);
            if (report == null)
            {
                return Result.Fail(new NoDataFound());
            }

            //remove the excel file
            DeleteFile(report.ExcelSaveFileName);


            //remove the files
            foreach(var item in report.ReportImages)
            {
                DeleteFile(item.ImageUploadPath);
            }

            this.context.ReportImages.RemoveRange(report.ReportImages);
            this.context.ReportSections.RemoveRange(report.ReportSections);
            this.context.Remove(report);
            await this.context.SaveChangesAsync();
            return Result.Ok(true);
        }

        void DeleteFile(string fileName)
        {
            var filePath = $"{Directory.GetCurrentDirectory()}/uploaddata/reports/{fileName}";
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }
    }
}
