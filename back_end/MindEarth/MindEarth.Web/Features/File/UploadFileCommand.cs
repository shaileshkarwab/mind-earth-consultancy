using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.File
{
    public class UploadFileCommand:IRequest<Result<string>>
    {
        public IFormFile file;
        public string uploadsFolder;
    }
}
