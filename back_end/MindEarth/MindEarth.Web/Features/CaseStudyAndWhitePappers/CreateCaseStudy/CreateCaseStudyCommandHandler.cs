using FluentResults;
using MediatR;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.CreateCaseStudy
{
    public class CreateCaseStudyCommandHandler : IRequestHandler<CreateCaseStudyCommand, Result<string>>
    {
        private readonly MindEarthContext mindEarthContext;
        private readonly IUserCommonService userCommonService;
        public CreateCaseStudyCommandHandler(MindEarthContext mindEarthContext, IUserCommonService userCommonService)
        {
            this.mindEarthContext = mindEarthContext;
            this.userCommonService = userCommonService;
        }
        public async Task<Result<string>> Handle(CreateCaseStudyCommand request, CancellationToken cancellationToken)
        {
            var rowID = Ulid.NewUlid().ToString();
            var caseStudyWhitePaper = new CaseStudyWhitePapper { 
                CaseWpDate = DateTimeHelper.ConvertDateStringToDate(request.CaseStudyWhitePaper.CaseWpDate!),
                Content = request.CaseStudyWhitePaper.Content,
                CreatedAt = this.userCommonService.TrasnDateTime,
                CreatedBy = this.userCommonService.UserId,
                EntityType = request.CaseStudyWhitePaper.EntityType,
                ImagePath = request.CaseStudyWhitePaper.ImagePath,
                PdfPath = request.CaseStudyWhitePaper.PdfPath,
                RowId = rowID,
                Title = request.CaseStudyWhitePaper.Title,
                UpdatedAt = this.userCommonService.TrasnDateTime,
                UpdatedBy = this.userCommonService.UserId
            };
            this.mindEarthContext.CaseStudyWhitePappers.Add(caseStudyWhitePaper);
            await this.mindEarthContext.SaveChangesAsync();
            return Result.Ok(rowID);
        }
    }
}
