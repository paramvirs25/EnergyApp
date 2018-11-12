using Microsoft.AspNetCore.Http;

namespace WebApi.Helpers
{
    public class OperatingUser
    {
        public int GetUserId(HttpContext httpContext)
        {
            //return 1;
            return int.Parse(httpContext.User.Identity.Name);
        }
    }
}
