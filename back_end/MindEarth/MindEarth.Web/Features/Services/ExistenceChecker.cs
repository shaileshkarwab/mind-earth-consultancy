using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using System.Linq.Expressions;

namespace MindEarth.Web.Features.Services
{
    public class ExistenceChecker : IExistenceChecker
    {
        private readonly MindEarthContext _context;
        public ExistenceChecker(MindEarthContext context) {
            _context = context;
        }
        public async Task<bool> CheckExistenceAsync<T>(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default) where T : class
        {
            return await _context.Set<T>().AnyAsync(predicate,cancellationToken);
        }
    }
}
