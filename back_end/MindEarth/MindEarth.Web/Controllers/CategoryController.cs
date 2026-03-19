using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Database.Entity;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory;
using MindEarth.Web.Features.CategorySubcategory.Command.Delete;
using MindEarth.Web.Features.CategorySubcategory.Command.UpdateCategory;
using MindEarth.Web.Features.CategorySubcategory.Query;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : APIBaseController
    {
        private readonly IMediator _mediator;
        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] DTO_CreateCategory saveEntity, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new CategoryCreateCommand(saveEntity), cancellationToken);
            return response.ToActionResult();
        }

        [HttpPost("list")]
        public async Task<IActionResult> SearchCategory([FromBody] Filter filter)
        {
            var respose = await _mediator.Send(new SearchQuery(filter));
            return respose.ToActionResult();
        }

        [HttpGet("{categoryID}")]
        public async Task<IActionResult> SearchCategory([FromRoute] string categoryID)
        {
            var respose = await _mediator.Send(new SearchQueryById(categoryID));
            return respose.ToActionResult();
        }

        [HttpDelete("{categoryID}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] string categoryID)
        {
            var respose = await _mediator.Send(new DeleteCategoryCommand(categoryID));
            return respose.ToActionResult();
        }

        [HttpPut("{categoryID}")]
        public async Task<IActionResult> UpdateCategory([FromRoute]string categoryID, [FromBody] DTO_CreateCategory saveEntity, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new UpdateCategoryCommand(categoryID, saveEntity), cancellationToken);
            return response.ToActionResult();
        }

        [HttpDelete("sub-category/{subCategoryID}")]
        public async Task<IActionResult> DeleteSubCategory([FromRoute] string subCategoryID)
        {
            var respose = await _mediator.Send(new DeleteSubCategoryCommand(subCategoryID));
            return respose.ToActionResult();
        }

        [HttpGet("list-sub-category")]
        public async Task<IActionResult> ListSubCategories()
        {
            var respose = await _mediator.Send(new SubCategoryQuery());
            return respose.ToActionResult();
        }
    }
}
