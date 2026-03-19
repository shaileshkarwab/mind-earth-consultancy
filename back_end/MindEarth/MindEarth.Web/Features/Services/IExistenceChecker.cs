using System.Linq.Expressions;

namespace MindEarth.Web.Features.Services
{
    public interface IExistenceChecker
    {
        Task<bool> CheckExistenceAsync<T>(Expression<Func<T,bool>> predicate,CancellationToken cancellationToken = default) where T : class;
    }
}
