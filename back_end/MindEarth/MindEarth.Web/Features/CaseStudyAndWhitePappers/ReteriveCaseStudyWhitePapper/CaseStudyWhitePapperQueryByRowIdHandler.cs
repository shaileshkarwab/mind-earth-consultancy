using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;
using MindEarth.Web.Features.Helpers;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.ReteriveCaseStudyWhitePapper
{

    public class CaseStudyWhitePapperQueryByRowIdHandler : IRequestHandler<CaseStudyWhitePapperQueryByRowId, Result<DTO_ManageCaseStudyWhitePaper>>
    {
        private readonly MindEarthContext mindEarthContext;
        private readonly IConfigParamService configuration;
        private readonly string documentPath;
        const string folderPath = "case-study-white-paper";
        public CaseStudyWhitePapperQueryByRowIdHandler(MindEarthContext mindEarthContext, IConfigParamService configuration)
        {
            this.mindEarthContext = mindEarthContext;
            this.configuration = configuration;
            this.documentPath = $"{configuration.GetWebPath()}/{folderPath}";
        }

        public async Task<Result<DTO_ManageCaseStudyWhitePaper>> Handle(CaseStudyWhitePapperQueryByRowId request, CancellationToken cancellationToken)
        {
            var caseStudy = await this.mindEarthContext.CaseStudyWhitePappers.SingleOrDefaultAsync(c => c.RowId == request.rowId);
            if (caseStudy == null) {
                return Result.Fail(new NoDataFound());
            }

            var response = new DTO_ManageCaseStudyWhitePaper { 
                CaseWpDate = DateTimeHelper.ConvertDateTimeToString(caseStudy.CaseWpDate),
                Content = caseStudy.Content,
                EntityType = caseStudy.EntityType,
                ImagePath = $"{this.documentPath}/{caseStudy.ImagePath}",
                PdfPath = caseStudy.PdfPath,
                RowId = request.rowId,
                Title = caseStudy.Title
            };
            return response;
        }
    }
}
