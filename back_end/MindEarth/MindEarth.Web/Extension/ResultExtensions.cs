using FluentResults;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Controllers;

namespace MindEarth.Web.Extension
{
    public static class ResultExtensions
    {
        public static ApiResponse<T> ToApiResponse<T>(this Result<T> result)
        {
            if (result.IsSuccess)
            {
                return new ApiResponse<T>
                {
                    StatusCode = 200,
                    Success = true,
                    Message = result.Successes.FirstOrDefault()?.Message ?? "Success",
                    Data = result.Value
                };
            }

            return new ApiResponse<T>
            {
                StatusCode = 400,
                Success = false,
                Message = result.Errors.FirstOrDefault()?.Message ?? "Failed",
                Errors = result.Errors.Select(e => e.Message).ToList()
            };
        }

        public static IActionResult ToActionResult<T>(this Result<T> result)
        {
            var response = result.ToApiResponse();
            return new ObjectResult(response)
            {
                StatusCode = response.StatusCode
            };
        }
    }
}
