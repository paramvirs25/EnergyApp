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
        
        Task<UserCreateModel> GetForCreate();
        Task<UserEditModel> GetForEdit(int id);

        Task<UserSaveModel> Save(UserSaveModel userSaveModel, int operatingUserId);
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
            //Verify username and password
            var user = await _context.UsersTbl
                .Include(udt => udt.UserDetailsTbl)
                .Where(u => 
                    u.Username == userAuthModel.Username
                    && u.Password == userAuthModel.Password
                    && u.UserDetailsTbl.IsDeleted == false)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            // check if user exists
            if (user == null)
            {
                throw new BadRequestException(UserValidationMessage.USERNAME_PASSWORD_INCORRECT);
            }

            //if admin role is to be verified and user is non-admin
            if (userAuthModel.CheckAdminRole && user.UserDetailsTbl.RoleId < Role.RoleId.Admin)
            {
                throw new BadRequestException(UserValidationMessage.USER_NON_AUTHORIZED_ADMIN_AREA);
            }

            // authentication successful
            return _mapper.Map<UserDetailsModel>(user.UserDetailsTbl);

            // check if password is correct
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //    return null;
        }

        public async Task<UserDetailsModel> GetById(int id)
        {
            var userDetailsTbl = await _context.UserDetailsTbl
                .Where(ud => ud.UserId == id && !ud.IsDeleted)
                .AsNoTracking()
                .SingleOrDefaultAsync();
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
                .Where(ud => ud.IsDeleted == false && ud.UserId > 1)
                .Include(s => s.CreatedByNavigation)
                .Include(s => s.ModifiedByNavigation)
                .Include(s => s.Role)
                .Include(s => s.UserType)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<List<UserDetailsTbl>, List<UserListModel>>(userDetailTbl);
        }

        public async Task<UserCreateModel> GetForCreate()
        {
            UserCreateModel userCreateModel = new UserCreateModel
            {
                Roles = _roleService.GetAll(),
                UserTypes = await _userTypeService.GetAll()
            };

            return userCreateModel;
        }

        public async Task<UserEditModel> GetForEdit(int id)
        {
            UserEditModel userEditModel = new UserEditModel
            {
                Roles = _roleService.GetAll(),
                UserTypes = await _userTypeService.GetAll()
            };

            var userTbl = await _context.UsersTbl
                .Include(u => u.UserDetailsTbl)
                .Where(u => 
                    u.UserId == id && 
                    !u.UserDetailsTbl.IsDeleted)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            userEditModel.User = _mapper.Map<UserModel>(userTbl);
            userEditModel.UserDetail = _mapper.Map<UserDetailsModel>(userTbl.UserDetailsTbl);

            return userEditModel;
        }

        public async Task<UserSaveModel> Save(UserSaveModel userSaveModel, int operatingUserId)
        {
            bool isCreateUser = userSaveModel.UserId == 0;

            //check for duplicate username
            if (await _context.UsersTbl
                .AsNoTracking()
                .AnyAsync(x =>
                    x.Username == userSaveModel.Username
                    && x.UserId != userSaveModel.UserId
                    )
                )
            {
                throw new BadRequestException(string.Format(UserValidationMessage.USERNAME_ALREADY_TAKEN, userSaveModel.Username));
            }


            //byte[] passwordHash, passwordSalt;
            //CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //user.PasswordHash = passwordHash;
            //user.PasswordSalt = passwordSalt;

            UsersTbl usersTbl = null;
            if (isCreateUser)
            {
                usersTbl = new UsersTbl
                {
                    UserDetailsTbl = new UserDetailsTbl()
                };
            }
            else
            {
                usersTbl = await _context.UsersTbl
                    .Where(u => u.UserId == userSaveModel.UserId)
                    .Include(udt => udt.UserDetailsTbl)
                    .SingleOrDefaultAsync();
            }

            //populate table objects
            _mapper.Map(userSaveModel, usersTbl);
            _mapper.Map(userSaveModel, usersTbl.UserDetailsTbl);

            //Save to User table and user detaisl table
            if (isCreateUser)
            {
                usersTbl.UserDetailsTbl.CreatedBy = operatingUserId;
                usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
                
                await _context.AddAsync(usersTbl);
            }
            else
            {
                usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
                usersTbl.UserDetailsTbl.ModifiedDate = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            //after save update models with data
            //_mapper.Map(usersTbl, userSaveModel.User);
            //_mapper.Map(usersTbl.UserDetailsTbl, userSaveModel.UserDetail);

            return userSaveModel;
        }

        public async Task Delete(int id, int operatingUserId)
        {
            var ud = await _context.UserDetailsTbl.SingleOrDefaultAsync(x => x.UserId == id);

            if (ud != null)
            {
                ud.IsDeleted = true;
                ud.ModifiedBy = operatingUserId;
                ud.ModifiedDate = DateTime.Now;

                await _context.SaveChangesAsync();
            }            
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