using MindEarth.Web.Common.Models;
using System.Linq.Expressions;

namespace MindEarth.Web.Extension
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> ApplyEqualityFilters<T>(this IQueryable<T> query, Filter filters)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            Expression? finalExpression = null;

            if (filters.EqualityFilters != null && filters.EqualityFilters.Count > 0)
            {
                foreach(var filter in filters.EqualityFilters)
                {
                    // x.SubCategory.SubCategoryListUrl
                    Expression property = parameter;

                    //if (!string.IsNullOrEmpty(filter.Entity))
                    //{
                    //    property = Expression.PropertyOrField(property, filter.Entity);
                    //}


                    if (!string.IsNullOrEmpty(filter.Entity) && filter.Entity != typeof(T).Name)
                    {
                        foreach (var part in filter.Entity.Split('.'))
                        {
                            property = Expression.PropertyOrField(property, part);
                        }
                    }

                    property = Expression.PropertyOrField(property, filter.FilterColumn);
                    // Convert value type
                    var constant = Expression.Constant(
                        Convert.ChangeType(filter.Value, property.Type)
                    );
                    // x.SubCategory.SubCategoryListUrl == "value"
                    var equality = Expression.Equal(property, constant);

                    finalExpression = finalExpression == null? equality: Expression.AndAlso(finalExpression, equality);
                }
                
            }
            if (finalExpression == null)
                return query;
            var lambda = Expression.Lambda<Func<T, bool>>(finalExpression, parameter);
            return query.Where(lambda);
        }
    }
}
