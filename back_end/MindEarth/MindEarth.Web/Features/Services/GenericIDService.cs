using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using System.Linq.Expressions;

namespace MindEarth.Web.Features.Services
{
    public class GenericIDService : IGenericIDService
    {
        private readonly MindEarthContext context;  
        public GenericIDService(MindEarthContext context) { 
            this.context = context;
        }

        public async Task<bool> GetAnyAsync<T>(Expression<Func<T, bool>> expression) where T : class
        {
            return await context.Set<T>()
                .Where(expression)
                .AnyAsync();
        }

        public async Task<TResult?> GetByIdAsync<T, TResult>(Expression<Func<T, bool>> expression, Expression<Func<T, TResult>> selector) where T : class
        {
            return await context.Set<T>()
            .Where(expression)
            .Select(selector)
            .SingleOrDefaultAsync();
        }
    }
}
