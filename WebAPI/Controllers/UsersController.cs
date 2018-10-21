using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using WebApi.Helpers;
using WebApi.Models;
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
        public async Task<IActionResult> Authenticate([FromBody]UserModel userModel)
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
        [Authorize(Policy = Policies.AdminsAndAbove)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //var users = _userService.GetAll();
            //var userDtos = _mapper.Map<IList<UserModel>>(users);
            return Ok(await _userService.GetAll());
        }

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
        /// Registers a user if it already doesnot exits
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        /// <response code="200">If Registratin succeeds</response>
        /// <response code="400">If registration failed</response> 
        //[AllowAnonymous]
        //[HttpPost("register")]
        //[ProducesResponseType(200)]
        //[ProducesResponseType(400)]
        //public IActionResult Register([FromBody]UserModel userModel)
        //{
        //    try
        //    {
        //        // save 
        //        _userService.Create(userModel);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}
    }
}
