using Microsoft.AspNetCore.Http;

namespace WebApi.Helpers
{
    public class OperatingUser
    {
        public int GetOperatingUserId(HttpContext httpContext)
        {
            return int.Parse(httpContext.User.Identity.Name);
        }
    }
}
