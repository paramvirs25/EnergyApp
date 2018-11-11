using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using WebApi.Helpers;
using WebApi.Models;
using WebApi.Models.UserModelExtensions;
using WebApi.Services;
using WebApi.Helpers.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Net;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private readonly AppSettings _appSettings;
        private OperatingUser _operatingUser;

        public UsersController(
            IUserService userService,
            IOptions<AppSettings> appSettings,
            OperatingUser operatingUser)
        {
            _userService = userService;
            //_mapper = mapper;
            _appSettings = appSettings.Value;
            _operatingUser = operatingUser;
        }

        /// <summary>
        /// Checks if username and password belongs to a valid user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /authenticate
        ///     {
        ///        "username": "anyusername",
        ///        "password": "anypassword"
        ///     }
        ///
        /// </remarks>
        /// <param name="userModel"></param>
        /// <returns>Authenticated user details</returns>
        /// <response code="200">Returns authenticated user</response>
        /// <response code="400">If user is not valid</response> 
        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Authenticate([FromBody]UserAuthenticateModel userModel)
        {
            var userDetails = await _userService.Authenticate(userModel);

            string tokenString = JWTAuthentication.GetToken(userDetails, _appSettings.Secret);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                userid = userDetails.UserId,
                token = tokenString
            });
        }

        /// <summary>
        /// Get logged in user
        /// </summary>
        /// <returns>Returns details of logged in user</returns>
        [Authorize(Policy = Policies.AgentsAndAbove)]
        [Route("GetLoggedIn")]
        [HttpGet]
        public async Task<ActionResult<UserDetailsModel>> GetLoggedIn()
        {
            return await _userService.GetById(_operatingUser.GetOperatingUserId(HttpContext));
        }

        /// <summary>
        /// Gets user by Id
        /// </summary>
        /// <param name="id">Id of user to find</param>
        /// <returns>Returns User</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailsModel>> GetById(int id)
        {
            return await _userService.GetById(id);
        }

        /// <summary>
        /// Gets a list of users
        /// </summary>
        /// <returns>Returns list of users</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("List")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserListModel>>> GetList()
        {
            return await _userService.GetList();
        }

        /// <summary>
        /// Gets data for 'Create' user screen
        /// </summary>
        /// <returns>Returns data for 'Create' user screen</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("GetForCreate")]
        [HttpGet]
        public async Task<ActionResult<UserCreateModel>> GetForCreate()
        {
            return await _userService.GetForCreate();
        }

        /// <summary>
        /// Gets data for 'Edit' user screen
        /// </summary>
        /// <returns>Returns data for 'Edit' user screen</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("GetForEdit/{id}")]
        [HttpGet]
        public async Task<ActionResult<UserEditModel>> GetForEdit(int id)
        {
            return await _userService.GetForEdit(id);
        }

        /// <summary>
        /// Delete User by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.Delete(id, _operatingUser.GetOperatingUserId(HttpContext));
            return Ok();
        }

        /// <summary>
        /// Creates a user if it already doesnot exits
        /// </summary>
        /// <param name="userCreateModel"></param>
        /// <returns></returns>
        /// <response code="200">If Registratin succeeds</response>
        /// <response code="400">If registration failed</response> 
        [HttpPost("create")]
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<bool>> Create([FromBody]UserCreateModel userCreateModel)
        {
            return await _userService.Create(userCreateModel, _operatingUser.GetOperatingUserId(HttpContext));
        }
    }
}
