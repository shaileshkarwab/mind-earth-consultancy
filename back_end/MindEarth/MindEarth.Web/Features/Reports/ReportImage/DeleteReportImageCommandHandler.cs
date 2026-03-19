using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.Reports.ReportImage
{
    public class DeleteReportImageCommandHandler : IRequestHandler<DeleteReportImageCommand, Result<string>>
    {
        private readonly MindEarthContext context;
        public DeleteReportImageCommandHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<string>> Handle(DeleteReportImageCommand request, CancellationToken cancellationToken)
        {
            var reportImage = await this.context.ReportImages.Where(c => c.RowId == request.reportImageRowId).SingleOrDefaultAsync();
            if (reportImage == null) {
                return Result.Fail(new NoDataFound());
            }

            this.context.ReportImages.Remove(reportImage);
            await this.context.SaveChangesAsync();

            return Result.Ok(request.reportImageRowId);
        }
    }
}
