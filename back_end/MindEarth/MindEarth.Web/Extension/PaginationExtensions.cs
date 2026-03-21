using MindEarth.Web.Common.Models;

namespace MindEarth.Web.Extension
{
    public static class PaginationExtensions
    {
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query,PageParameter page)
        {
            if (page == null || page.PageNo <= 0 || page.PageSize <= 0)
                return query;

            int skip = (page.PageNo - 1) * page.PageSize;

            return query.Skip(skip).Take(page.PageSize);
        }
    }
}
