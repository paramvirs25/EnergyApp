using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using WebApi.Helpers;
using WebApi.Models;
using WebApi.Models.ContentModelExtensions;
using WebApi.Services;
using WebApi.Helpers.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserContentController : ControllerBase
    {
        private IUserContentService _userContentService;
        private readonly AppSettings _appSettings;
        private OperatingUser _operatingUser;

        public UserContentController(
            IUserContentService contentService,
            IOptions<AppSettings> appSettings,
            OperatingUser operatingUser)
        {
            _userContentService = contentService;
            _appSettings = appSettings.Value;
            _operatingUser = operatingUser;
        }

        /// <summary>
        /// Gets user content list
        /// </summary>
        /// <returns>Returns list of user content</returns>
        [Authorize(Policy = Policies.AgentsAndAbove)]
        [Route("listByUserId/{userId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserContentListModel>>> GetListByUserId(int userId)
        {
            return await _userContentService.GetListByUserId(userId);
        }
    }
}
