using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MindEarth.Web.Controllers
{
    [ApiController]
    public class APIBaseController : ControllerBase
    {
        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsSuccess)
                return Ok(result.Value);

            var apiError = result.Errors
                                 .OfType<ApiError>()
                                 .FirstOrDefault();

            if (apiError != null)
            {
                return StatusCode(apiError.StatusCode, new
                {
                    message = apiError.Message
                });
            }

            return BadRequest(new
            {
                errors = result.Errors.Select(e => e.Message)
            });
        }


    }
}
