using FluentResults;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Controllers
{
    public abstract class ApiError: Error
    {
        public int StatusCode { get; }

        protected ApiError(string message, int statusCode): base(message)
        {
            StatusCode = statusCode;
        }
    }
}
