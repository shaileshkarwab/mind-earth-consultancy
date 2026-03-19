using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Helpers;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.DeleteCaseStudyWhitePapper
{
    public class DeleteCasePaperCaseStudyCommandHandler : IRequestHandler<DeleteCasePaperCaseStudyCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        const string folderPath = "case-study-white-paper";
        public DeleteCasePaperCaseStudyCommandHandler(MindEarthContext context) { 
            this.context = context;
        }

        public async Task<Result<bool>> Handle(DeleteCasePaperCaseStudyCommand request, CancellationToken cancellationToken)
        {
            var caseStudy = await this.context.CaseStudyWhitePappers.SingleOrDefaultAsync(c => c.RowId == request.rowID);
            if (caseStudy == null) {
                return Result.Fail(new NoDataFound());
            }

            //delete the file associated with this
            FileHandler.DeleteFile($"{folderPath}\\{caseStudy.ImagePath}");
            FileHandler.DeleteFile($"{folderPath}\\{caseStudy.PdfPath}");

            this.context.CaseStudyWhitePappers.Remove(caseStudy);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
