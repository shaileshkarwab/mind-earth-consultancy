
using MindEarth.Database.Entity;
using System.Security.Claims;

namespace MindEarth.Web.Features.Services
{
    public class UserCommonService : IUserCommonService
    {
        private readonly MindEarthContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserCommonService(MindEarthContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public int UserId => _context.Users.SingleOrDefault(c=>c.Email == _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value).Id;

        public DateTime TrasnDateTime => DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);
    }
}
