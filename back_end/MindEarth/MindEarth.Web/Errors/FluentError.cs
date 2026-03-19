using FluentResults;
using MindEarth.Web.Controllers;

namespace MindEarth.Web.Errors
{
    public class FluentError
    {
        
    }

    public class UnAuthorisedError : ApiError
    {
        public UnAuthorisedError() : base("Invalid username or password.", StatusCodes.Status401Unauthorized)
        {
            
        }
    }

    public class BadRequestError : ApiError
    {
        public BadRequestError() : base("Invalid input or missing data.", StatusCodes.Status400BadRequest)
        {

        }
    }

    public class NoDataFound : ApiError
    {
        public NoDataFound() : base("Data not found", StatusCodes.Status404NotFound)
        {

        }
    }


    public class NoDirectoryFound : ApiError
    {
        public NoDirectoryFound() : base("The upload directory not found", StatusCodes.Status404NotFound)
        {

        }
    }

    public class NoFileError:ApiError
            {
        public NoFileError() : base("No file uploaded", StatusCodes.Status400BadRequest)
        {
        }
    }

    public class InValidFile : ApiError
    {
        public InValidFile() : base("Invalid file for upload", StatusCodes.Status400BadRequest)
        {
        }
    }
}
