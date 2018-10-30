using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using WebApi.Helpers;
using WebApi.Models;
using WebApi.Models.UserModelExtensions;
using WebApi.Services;
using WebApi.Helpers.Authorization;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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
            var userDetails = await _userService.Authenticate(userModel.Username, userModel.Password);
            if (userDetails == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            //if admin role is to be verified and user is non-admin
            if (userModel.CheckAdminRole && userDetails.RoleId < Role.RoleId.Admin)
            {
                return BadRequest(new { message = "User not authorized to access admin area" });
            }

            string tokenString = JWTAuthentication.GetToken(userDetails, _appSettings.Secret);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                userid = userDetails.UserId,
                token = tokenString
            });
        }

        /// <summary>
        /// Gets a list of all users
        /// </summary>
        /// <returns>Gets a list of all users</returns>
        //[Authorize(Policy = Policies.AdminsAndAbove)]
        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    return Ok(await _userService.GetAll());
        //}

        /// <summary>
        /// Get logged in user
        /// </summary>
        /// <returns>Returns details of logged in user</returns>
        [Authorize(Policy = Policies.AgentsAndAbove)]
        [Route("GetLoggedIn")]
        [HttpGet]
        public async Task<IActionResult> GetLoggedIn()
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            return Ok(await _userService.GetById(userId));
        }

        /// <summary>
        /// Gets user by Id
        /// </summary>
        /// <param name="id">Id of user to find</param>
        /// <returns>Returns User</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _userService.GetById(id));
        }

        /// <summary>
        /// Gets a list of users
        /// </summary>
        /// <returns>Returns list of users</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("List")]
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _userService.GetList());
        }

        /// <summary>
        /// Gets data for 'Create' user screen
        /// </summary>
        /// <returns>Returns data for 'Create' user screen</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("GetForCreate")]
        [HttpGet]
        public async Task<IActionResult> GetForCreate()
        {
            try
            {
                return Ok(await _userService.GetForCreate());
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets data for 'Edit' user screen
        /// </summary>
        /// <returns>Returns data for 'Edit' user screen</returns>
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [Route("GetForEdit/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetForEdit(int id)
        {
            try
            {
                return Ok(await _userService.GetForEdit(id));
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //[HttpPut("{id}")]
        //public IActionResult Update(int id, [FromBody]UserModel userDto)
        //{
        //    // map dto to entity and set id
        //    //var user = _mapper.Map<UsersTbl>(userDto);
        //    //user.UserId = id;

        //    try
        //    {
        //        // save 
        //        _userService.Update(userDto, userDto.Password);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _userService.Delete(id);
        //    return Ok();
        //}

        /// <summary>
        /// Creates a user if it already doesnot exits
        /// </summary>
        /// <param name="userSaveModel"></param>
        /// <returns></returns>
        /// <response code="200">If Registratin succeeds</response>
        /// <response code="400">If registration failed</response> 
        [HttpPost("save")]
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Save([FromBody]UserSaveModel userSaveModel)
        {
            try
            {
                // save 
                return Ok(await _userService.Save(userSaveModel));
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
