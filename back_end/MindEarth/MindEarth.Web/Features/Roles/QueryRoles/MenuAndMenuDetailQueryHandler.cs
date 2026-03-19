using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public class MenuAndMenuDetailQueryHandler : IRequestHandler<MenuAndMenuDetailQuery, Result<List<DTO_Menu>>>
    {
        private readonly MindEarthContext context;
        public MenuAndMenuDetailQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<DTO_Menu>>> Handle(MenuAndMenuDetailQuery request, CancellationToken cancellationToken)
        {
            var response = await this.context.Menus.Include(m => m.MenuDetails).ToListAsync();
            var menu = response.Select(c => new DTO_Menu
            {
                IsActive = c.IsActive,
                RowId = c.RowId,
                Text = c.Text,
                MenuDetails = c.MenuDetails.Select(d => new DTO_MenuDetail
                {
                    IsActive = d.IsActive,
                    MenuDetailId = d.RowId,
                    Text = d.Text,
                    AddRight = false,
                    ViewRight = false,
                    ModifyRight = false,
                    DeleteRight = false
                }).ToList()
            }).ToList();
            return menu;
        }
    }
}
