using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.DTO;

namespace MindEarth.Web.Extension
{
    public static class PaginationExtensions
    {
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query,PageParameter page,out PaginationMeta meta)
        {
            meta = null;

            if (page == null || page.PageNo <= 0 || page.PageSize <= 0)
                return query;

            int totalRecords = query.Count();

            int skip = (page.PageNo - 1) * page.PageSize;

            meta = new PaginationMeta
            {
                TotalRecords = totalRecords,
                PageSize = page.PageSize,
                CurrentPage = page.PageNo
            };

            return query.Skip(skip).Take(page.PageSize);
        }
    }
}
