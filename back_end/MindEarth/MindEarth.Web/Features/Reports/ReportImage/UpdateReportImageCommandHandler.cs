using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.Reports.ReportImage
{
    public class UpdateReportImageCommandHandler : IRequestHandler<UpdateReportImageCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        private readonly IGenericIDService genericIDService;
        public UpdateReportImageCommandHandler(MindEarthContext context, IUserCommonService userCommonService, IGenericIDService genericIDService) { 
            this.context = context;
            this.userCommonService = userCommonService;
            this.genericIDService = genericIDService;
        }
        public async Task<Result<bool>> Handle(UpdateReportImageCommand request, CancellationToken cancellationToken)
        {
            var reportImage = await this.context.ReportImages.SingleOrDefaultAsync(c => c.RowId == request.imageRowId);
            if (reportImage == null) {
                return Result.Fail(new NoDataFound());
            }

            reportImage.ImageUploadPath = request.createImage.SavedImageName;
            reportImage.UpdatedBy = this.userCommonService.UserId;
            reportImage.UpdatedAt = this.userCommonService.TrasnDateTime;
            this.context.ReportImages.Update(reportImage);
            
            await this.context.SaveChangesAsync();
            return true;

        }
    }
}
