using System.Linq.Expressions;

namespace MindEarth.Web.Features.Services
{
    public interface IGenericIDService
    {
        Task<TResult?> GetByIdAsync<T,TResult>(Expression<Func<T,bool>> expression, Expression<Func<T, TResult>> selector) where T : class;

        Task<bool> GetAnyAsync<T>(Expression<Func<T,bool>> expression) where T : class;

    }
}
