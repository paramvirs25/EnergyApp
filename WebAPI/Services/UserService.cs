using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

using AutoMapper;
using DAL.Entities;

using WebApi.Models;
using WebApi.Models.UserModelExtensions;
using WebApi.Helpers;
using WebApi.AppConstants.ValidationMessages;
using WebApi.Helpers.Authorization;
using WebApi.Helpers.Exceptions;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<UserDetailsModel> Authenticate(UserAuthenticateModel userAuthModel);

        Task<UserDetailsModel> GetById(int id);
        Task<List<UserListModel>> GetList();
        
        Task<UserCreateGetModel> GetForCreate();
        Task<UserEditGetModel> GetForEdit(int id);

        Task<bool> Create(UserCreateModel userCreateModel, int operatingUserId);
        Task Delete(int id, int operatingUserId);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private IMapper _mapper;
        private IRoleService _roleService;
        private IUserTypeService _userTypeService;

        public UserService(
            DataContext context,
            IMapper mapper,
            IRoleService roleService,
            IUserTypeService userTypeService)
        {
            _context = context;
            _mapper = mapper;
            _roleService = roleService;
            _userTypeService = userTypeService;
        }

        public async Task<UserDetailsModel> Authenticate(UserAuthenticateModel userAuthModel)
        {
            //get user with specified username and password
            var user = await _context.UsersTbl
                .Include(udt => udt.UserDetailsTbl)
                .Where(u => 
                    u.Username == userAuthModel.Username
                    && u.Password == userAuthModel.Password
                    && !u.UserDetailsTbl.IsDeleted)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            // if user not found then show error
            if (user == null) { throw new BadRequestException(UserValidationMessage.USERNAME_PASSWORD_INCORRECT); }

            //if admin role is to be verified and user is non-admin then show error
            if (userAuthModel.CheckAdminRole &&
                user.UserDetailsTbl.RoleId < Role.RoleId.Admin) { throw new BadRequestException(UserValidationMessage.USER_NON_AUTHORIZED_ADMIN_AREA); }

            // authentication successful
            return _mapper.Map<UserDetailsModel>(user.UserDetailsTbl);

            // check if password is correct
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //    return null;
        }

        public async Task<UserDetailsModel> GetById(int id)
        {
            var userDetailsTbl = await _context.UserDetailsTbl
                .Where(ud => 
                    ud.UserId == id 
                    && !ud.IsDeleted)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            //if no user is found then show error
            if (userDetailsTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

            return _mapper.Map<UserDetailsModel>(userDetailsTbl);
        }

        /// <summary>
        /// Gets list of all users excluding 
        /// * super admin user and 
        /// * non-active users
        /// </summary>
        /// <returns>Returns list of users</returns>
        public async Task<List<UserListModel>> GetList()
        {
            var userDetailTbl = await _context.UserDetailsTbl
                .Where(ud =>
                    ud.RoleId < Role.RoleId.SuperAdmin   //non superadmin user
                    && !ud.IsDeleted)
                .Include(s => s.CreatedByNavigation)
                .Include(s => s.ModifiedByNavigation)
                .Include(s => s.Role)
                .Include(s => s.UserType)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<List<UserDetailsTbl>, List<UserListModel>>(userDetailTbl);
        }

        public async Task<UserCreateGetModel> GetForCreate()
        {
            UserCreateGetModel userCreateGetModel = new UserCreateGetModel
            {
                User = new UserModel(),
                UserDetailsBase = new UserDetailsBaseModel(),
                Roles = _roleService.GetAll(),
                UserTypes = await _userTypeService.GetAll()
            };

            return userCreateGetModel;
        }

        public async Task<UserEditGetModel> GetForEdit(int id)
        {
            UserEditGetModel userEditGetModel = new UserEditGetModel
            {
                Roles = _roleService.GetAll(),
                UserTypes = await _userTypeService.GetAll()
            };

            //var userTbl = await _context.UsersTbl
            //    .Include(u => u.UserDetailsTbl)
            //    .Where(u => 
            //        u.UserId == id && 
            //        !u.UserDetailsTbl.IsDeleted)
            //    .AsNoTracking()
            //    .SingleOrDefaultAsync();

            ////if no user is found then show error
            //if (userTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

            //userEditGetModel.User = _mapper.Map<UserModel>(userTbl);
            //userEditGetModel.UserDetailsBase = _mapper.Map<UserDetailsBaseModel>(userTbl.UserDetailsTbl);

            return userEditGetModel;
        }

        public async Task<bool> Create(UserCreateModel userCreateModel, int operatingUserId)
        {
            //bool isCreateUser = userCreateModel.UserId == 0;

            //check for duplicate username
            if (await _context.UsersTbl
                .Include(udt => udt.UserDetailsTbl)
                .AsNoTracking()
                .AnyAsync(u =>
                    u.Username == userCreateModel.User.Username
                    && u.UserId != userCreateModel.User.UserId
                    && !u.UserDetailsTbl.IsDeleted
                    )
                ) { throw new BadRequestException(string.Format(UserValidationMessage.USERNAME_ALREADY_TAKEN, userCreateModel.User.Username)); }


            //byte[] passwordHash, passwordSalt;
            //CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //user.PasswordHash = passwordHash;
            //user.PasswordSalt = passwordSalt;

            UsersTbl usersTbl = null;
            //if (isCreateUser)
            //{
                usersTbl = new UsersTbl
                {
                    UserDetailsTbl = new UserDetailsTbl()
                };
            //}
            //else
            //{
            //    usersTbl = await _context.UsersTbl
            //        .Include(udt => udt.UserDetailsTbl)
            //        .Where(u => 
            //            u.UserId == userCreateModel.UserId
            //            && !u.UserDetailsTbl.IsDeleted)
            //        .SingleOrDefaultAsync();

            //    //if no user is found then show error
            //    if (usersTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }
            //}

            //populate table objects
            _mapper.Map(userCreateModel.User, usersTbl);
            _mapper.Map(userCreateModel.UserDetailsBase, usersTbl.UserDetailsTbl);

            //Save to User table and user detaisl table
            //if (isCreateUser)
            //{
                usersTbl.UserDetailsTbl.CreatedBy = operatingUserId;
                usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
                
                await _context.AddAsync(usersTbl);
            //}
            //else
            //{
            //    usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
            //    usersTbl.UserDetailsTbl.ModifiedDate = DateTime.Now;
            //}

            await _context.SaveChangesAsync();

            //after save update models with data
            //_mapper.Map(usersTbl, userSaveModel.User);
            //_mapper.Map(usersTbl.UserDetailsTbl, userSaveModel.UserDetail);

            return true;
        }

        public async Task Delete(int id, int operatingUserId)
        {
            var ud = await _context.UserDetailsTbl.SingleOrDefaultAsync(x => x.UserId == id);

            //if no user is found then show error
            if ( ud == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

            ud.IsDeleted = true;
            ud.ModifiedBy = operatingUserId;
            ud.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
        }

        // private helper methods

        //private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        //{
        //    if (password == null) throw new ArgumentNullException("password");
        //    if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

        //    using (var hmac = new System.Security.Cryptography.HMACSHA512())
        //    {
        //        passwordSalt = hmac.Key;
        //        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //    }
        //}

        //private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        //{
        //    if (password == null) throw new ArgumentNullException("password");
        //    if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
        //    if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
        //    if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

        //    using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
        //    {
        //        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //        for (int i = 0; i < computedHash.Length; i++)
        //        {
        //            if (computedHash[i] != storedHash[i]) return false;
        //        }
        //    }

        //    return true;
        //}
    }
}