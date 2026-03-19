using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;
using MindEarth.Web.Features.Helpers;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.ReteriveCaseStudyWhitePapper
{
    public class CaseStudyWhitePapperQueryHandler : IRequestHandler<CaseStudyWhitePapperQuery, Result<List<DTO_CaseStudyList>>>
    {
        private readonly MindEarthContext context;
        public CaseStudyWhitePapperQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<DTO_CaseStudyList>>> Handle(CaseStudyWhitePapperQuery request, CancellationToken cancellationToken)
        {
            var list = this.context.CaseStudyWhitePappers.Select(c => new DTO_CaseStudyList
            {
                CaseWpDate = DateTimeHelper.ConvertDateTimeToString(c.CaseWpDate),
                Content = c.Content,
                EntityType = c.EntityType,
                ImagePath = c.ImagePath,
                PdfPath = c.PdfPath,
                RowId = c.RowId,
                Title = c.Title
            }).AsQueryable();
            var response = await list.ToListAsync();
            return Result.Ok(response);
        }
    }
}
