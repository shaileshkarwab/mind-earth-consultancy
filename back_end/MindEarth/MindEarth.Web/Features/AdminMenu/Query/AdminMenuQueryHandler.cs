using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;

namespace MindEarth.Web.Features.AdminMenu.Query
{
    public class AdminMenuQueryHandler : IRequestHandler<AdminMenuQuery, Result<List<DTO_AdminMenu>>>
    {
        private readonly MindEarthContext mindEarthContext;
        public AdminMenuQueryHandler(MindEarthContext mindEarthContext)
        {
            this.mindEarthContext = mindEarthContext;
        }
        public async Task<Result<List<DTO_AdminMenu>>> Handle(AdminMenuQuery request, CancellationToken cancellationToken)
        {
            var adminMenu = await (from m in mindEarthContext.Menus
                             where m.IsActive == true
                             select new DTO_AdminMenu
                             {
                                 Controller = m.Controller,
                                 FaIcon = m.FaIcon,
                                 PageUrl = m.PageUrl,
                                 Text = m.Text,
                                 SeqNo =  m.SeqNo,
                                 Details = (from d in mindEarthContext.MenuDetails
                                            where d.MenuId == m.Id
                                            && d.IsActive == true
                                            select new DTO_AdminMenuDetail
                                            {
                                                FaIcon = d.FaIcon,
                                                IsActive = d.IsActive,
                                                PageUrl = d.PageUrl,
                                                Text = d.Text,
                                                SeqNo = d.SeqNo
                                            }).OrderBy(d=>d.SeqNo).ToList()
                             }).OrderBy(c=>c.SeqNo) .ToListAsync();
            return Result.Ok(adminMenu);
        }
    }
}
