using FluentResults;
using MediatR;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.File
{
    public class UploadFileCommandHandler : IRequestHandler<UploadFileCommand, Result<string>>
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        private readonly String[] validFileExtensions;
        public UploadFileCommandHandler(IWebHostEnvironment env, IConfiguration configuration) { 
            _env = env;
            _configuration = configuration;
            validFileExtensions = _configuration.GetSection("AppSettings:ValidFileExtensions").Get<string[]>();
        }
        public async Task<Result<string>> Handle(UploadFileCommand request, CancellationToken cancellationToken)
        {
            if (request.file == null || request.file.Length == 0)
                return Result.Fail<string>(new NoFileError());

            var fileInfo = new System.IO.FileInfo(request.file.FileName);
            bool isFileExtensionValid =  validFileExtensions.Any(c => c == fileInfo.Extension);
            if(!isFileExtensionValid)
                return Result.Fail<string>(new InValidFile());

            var fileName = $"{Guid.NewGuid().ToString()}{fileInfo.Extension}";
            var directoryPath = Path.Combine($"uploaddata", request.uploadsFolder);
            if(!System.IO.Directory.Exists(directoryPath))
            {
               return Result.Fail(new NoDirectoryFound());
            }

            var filePath = Path.Combine($"uploaddata", request.uploadsFolder, fileName);
            
            
            using var stream = new FileStream(filePath, FileMode.Create);

            await request.file.CopyToAsync(stream, cancellationToken);
            return Result.Ok( fileName);
        }
    }
}
