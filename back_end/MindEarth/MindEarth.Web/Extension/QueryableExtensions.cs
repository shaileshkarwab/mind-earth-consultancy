using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.Helpers;
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

            //for boolean filters
            if (filters.BoolFilters != null && filters.BoolFilters.Count > 0)
            {
                foreach (var filter in filters.BoolFilters)
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

                    finalExpression = finalExpression == null ? equality : Expression.AndAlso(finalExpression, equality);
                }

            }


            //for range filters
            if (filters.IntegerRangeFilters != null && filters.IntegerRangeFilters.Count > 0)
            {
                foreach (var filter in filters.IntegerRangeFilters)
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

                    Type targetType = property.Type;
                    // unwrap Nullable<T> → decimal
                    Type underlyingType = Nullable.GetUnderlyingType(targetType) ?? targetType;

                    // convert 2000 → decimal (2000m)
                    var convertedValue = Convert.ChangeType(filter.Value, underlyingType);

                    // wrap back into decimal?
                    var constant = Expression.Constant(convertedValue, targetType);


                    // x.SubCategory.SubCategoryListUrl == "value"
                    Expression equality = Expression.Equal(property, constant);
                    if (filter.RangeType == "FROM")
                    {
                        equality = Expression.GreaterThanOrEqual(property, constant);
                    }
                    else if (filter.RangeType == "TO")
                    {
                        equality = Expression.LessThanOrEqual(property, constant);
                    }
                    finalExpression = finalExpression == null ? equality : Expression.AndAlso(finalExpression, equality);
                }

            }


            //for date range filters
            if (filters.DateFilters != null && filters.DateFilters.Count > 0)
            {
                foreach (var filter in filters.DateFilters)
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

                    Type targetType = property.Type;
                    // unwrap Nullable<T> → decimal
                    Type underlyingType = Nullable.GetUnderlyingType(targetType) ?? targetType;

                    // convert 2000 → decimal (2000m)
                    var convertedValue = Convert.ChangeType(DateTimeHelper.ConvertDateStringToDate(filter.Value), underlyingType);

                    // wrap back into decimal?
                    var constant = Expression.Constant(convertedValue, targetType);


                    // x.SubCategory.SubCategoryListUrl == "value"
                    Expression equality = Expression.Equal(property, constant);
                    if (filter.RangeType == "FROM")
                    {
                        equality = Expression.GreaterThanOrEqual(property, constant);
                    }
                    else if (filter.RangeType == "TO")
                    {
                        equality = Expression.LessThanOrEqual(property, constant);
                    }
                    finalExpression = finalExpression == null ? equality : Expression.AndAlso(finalExpression, equality);
                }

            }



            if (finalExpression == null)
                return query;
            var lambda = Expression.Lambda<Func<T, bool>>(finalExpression, parameter);
            return query.Where(lambda);
        }
    }
}
