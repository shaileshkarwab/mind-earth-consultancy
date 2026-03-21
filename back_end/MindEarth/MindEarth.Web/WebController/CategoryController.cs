using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Controllers;
using MindEarth.Web.Features.CategorySubcategory.Query;
using MindEarth.Web.Extension;

namespace MindEarth.Web.WebController
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CategoryController : APIBaseController
    {
        private readonly IMediator mediator;
        public CategoryController(IMediator mediator) { 
            this.mediator = mediator;
        }


        [HttpGet("v2")]
        public async Task<IActionResult> GetAllCategories()
        {
            var response = await this.mediator.Send(new CategorySubCategoryListQuery());
            return response.ToActionResult();
        }

    }
}
