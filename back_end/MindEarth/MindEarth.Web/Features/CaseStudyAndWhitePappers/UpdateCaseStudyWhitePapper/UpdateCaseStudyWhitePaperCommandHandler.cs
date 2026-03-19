using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.UpdateCaseStudyWhitePapper
{
    public class UpdateCaseStudyWhitePaperCommandHandler : IRequestHandler<UpdateCaseStudyWhitePaperCommand, Result<string>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        public UpdateCaseStudyWhitePaperCommandHandler(MindEarthContext context, IUserCommonService userCommonService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
        }
        public async Task<Result<string>> Handle(UpdateCaseStudyWhitePaperCommand request, CancellationToken cancellationToken)
        {
            var caseStudy = await this.context.CaseStudyWhitePappers.SingleOrDefaultAsync(c => c.RowId == request.rowId);
            if(caseStudy == null)
            {
                return Result.Fail(new NoDataFound());
            }
            caseStudy.Title = request.CaseStudyWhitePaper.Title;
            caseStudy.Content = request.CaseStudyWhitePaper.Content;
            caseStudy.UpdatedAt = userCommonService.TrasnDateTime;
            caseStudy.UpdatedBy = userCommonService.UserId;
            caseStudy.CaseWpDate = DateTimeHelper.ConvertDateStringToDate(request.CaseStudyWhitePaper.CaseWpDate);
            if(!string.IsNullOrEmpty( request.CaseStudyWhitePaper.PdfPath))
            {
                caseStudy.PdfPath = request.CaseStudyWhitePaper.PdfPath;
            }

            if (!string.IsNullOrEmpty(request.CaseStudyWhitePaper.ImagePath))
            {
                caseStudy.ImagePath = request.CaseStudyWhitePaper.ImagePath;
            }

            this.context.CaseStudyWhitePappers.Update(caseStudy);
            await this.context.SaveChangesAsync();

            return Result.Ok(request.rowId);
        }
    }
}
