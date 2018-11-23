using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

using AutoMapper;
using DAL.Entities;

using WebApi.Models;
using WebApi.Models.ContentModelExtensions;
using WebApi.AppConstants.ValidationMessages;
using WebApi.Helpers.Authorization;
using WebApi.Helpers.Exceptions;

namespace WebApi.Services
{
    public interface IContentService
    {
        Task<ContentModel> GetById(int id);
        Task<List<ContentListModel>> GetList();
        //Task<UserCreateGetModel> GetForCreate();
        //Task<UserEditGetModel> GetForEdit(int id);

        //Task<bool> Create(UserCreateSaveModel userCreateSaveModel, int operatingUserId);
        //Task<bool> Update(UserModel userModel, int operatingUserId);
        //Task Delete(int id, int operatingUserId);
    }

    public class ContentService : IContentService
    {
        private DataContext _context;
        private IMapper _mapper;

        public ContentService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Get content details by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ContentModel> GetById(int id)
        {
            var contentTbl = await _context.ContentTbl
                .Where(c => 
                    c.ContentId == id 
                    && !c.IsDeleted)
                .AsNoTracking()
                .SingleOrDefaultAsync();

            //if not found then show error
            if (contentTbl == null) { throw new NotFoundException(ContentValidationMessage.CONTENT_NOT_FOUND); }

            return _mapper.Map<ContentModel>(contentTbl);
        }

        /// <summary>
        /// Gets list of all contents excluding non-active ones
        /// </summary>
        /// <returns>Returns list of content</returns>
        public async Task<List<ContentListModel>> GetList()
        {
            var contentTbl = await _context.ContentTbl
                .Where(c =>
                    !c.IsDeleted)
                .Include(s => s.CreatedByNavigation)
                .Include(s => s.ModifiedByNavigation)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<List<ContentTbl>, List<ContentListModel>>(contentTbl);
        }

        //public async Task<UserCreateGetModel> GetForCreate()
        //{
        //    UserCreateGetModel userCreateGetModel = new UserCreateGetModel
        //    {
        //        Roles = _roleService.GetAll(),
        //        UserTypes = await _userTypeService.GetAll()
        //    };

        //    return userCreateGetModel;
        //}

        //public async Task<UserEditGetModel> GetForEdit(int id)
        //{
        //    UserEditGetModel userEditGetModel = new UserEditGetModel
        //    {
        //        Roles = _roleService.GetAll(),
        //        UserTypes = await _userTypeService.GetAll()
        //    };

        //    var userTbl = await _context.UsersTbl
        //        .Include(u => u.UserDetailsTbl)
        //        .Where(u =>
        //            u.UserId == id &&
        //            !u.UserDetailsTbl.IsDeleted)
        //        .AsNoTracking()
        //        .SingleOrDefaultAsync();

        //    //if no user is found then show error
        //    if (userTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

        //    userEditGetModel.User = _mapper.Map<UserModel>(userTbl);
        //    userEditGetModel.UserDetailsBaseAdmin = _mapper.Map<UserDetailsBaseAdminModel>(userTbl.UserDetailsTbl);

        //    return userEditGetModel;
        //}

        //public async Task<bool> Create(UserCreateSaveModel userCreateSaveModel, int operatingUserId)
        //{
        //    //bool isCreateUser = userCreateModel.UserId == 0;

        //    //check for duplicate username
        //    if (await _context.UsersTbl
        //        .Include(udt => udt.UserDetailsTbl)
        //        .AsNoTracking()
        //        .AnyAsync(u =>
        //            u.Username == userCreateSaveModel.User.Username
        //            && u.UserId != userCreateSaveModel.User.UserId
        //            && !u.UserDetailsTbl.IsDeleted
        //            )
        //        ) { throw new BadRequestException(string.Format(UserValidationMessage.USERNAME_ALREADY_TAKEN, userCreateSaveModel.User.Username)); }


        //    //byte[] passwordHash, passwordSalt;
        //    //CreatePasswordHash(password, out passwordHash, out passwordSalt);

        //    //user.PasswordHash = passwordHash;
        //    //user.PasswordSalt = passwordSalt;

        //    UsersTbl usersTbl = null;
        //    //if (isCreateUser)
        //    //{
        //        usersTbl = new UsersTbl
        //        {
        //            UserDetailsTbl = new UserDetailsTbl()
        //        };
        //    //}
        //    //else
        //    //{
        //    //    usersTbl = await _context.UsersTbl
        //    //        .Include(udt => udt.UserDetailsTbl)
        //    //        .Where(u => 
        //    //            u.UserId == userCreateModel.UserId
        //    //            && !u.UserDetailsTbl.IsDeleted)
        //    //        .SingleOrDefaultAsync();

        //    //    //if no user is found then show error
        //    //    if (usersTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }
        //    //}

        //    //populate table objects
        //    _mapper.Map(userCreateSaveModel.User, usersTbl);
        //    _mapper.Map(userCreateSaveModel.UserDetailsBaseAdmin, usersTbl.UserDetailsTbl);

        //    //Save to User table and user detaisl table
        //    //if (isCreateUser)
        //    //{
        //        usersTbl.UserDetailsTbl.CreatedBy = operatingUserId;
        //        usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
                
        //        await _context.AddAsync(usersTbl);
        //    //}
        //    //else
        //    //{
        //    //    usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
        //    //    usersTbl.UserDetailsTbl.ModifiedDate = DateTime.Now;
        //    //}

        //    await _context.SaveChangesAsync();

        //    //after save update models with data
        //    //_mapper.Map(usersTbl, userSaveModel.User);
        //    //_mapper.Map(usersTbl.UserDetailsTbl, userSaveModel.UserDetail);

        //    return true;
        //}

        //public async Task<bool> Update(UserModel userModel, int operatingUserId)
        //{
        //    //check for duplicate username
        //    if (await _context.UsersTbl
        //        .Include(udt => udt.UserDetailsTbl)
        //        .AsNoTracking()
        //        .AnyAsync(u =>
        //            u.Username == userModel.Username
        //            && u.UserId != userModel.UserId
        //            && !u.UserDetailsTbl.IsDeleted
        //            )
        //        ) { throw new BadRequestException(string.Format(UserValidationMessage.USERNAME_ALREADY_TAKEN, userModel.Username)); }


        //    UsersTbl usersTbl = await _context.UsersTbl
        //        .Include(udt => udt.UserDetailsTbl)
        //        .Where(u =>
        //            u.UserId == userModel.UserId
        //            && !u.UserDetailsTbl.IsDeleted)
        //        .SingleOrDefaultAsync();

        //    //if no user is found then show error
        //    if (usersTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

        //    //populate table objects
        //    _mapper.Map(userModel, usersTbl);

        //    usersTbl.UserDetailsTbl.ModifiedBy = operatingUserId;
        //    usersTbl.UserDetailsTbl.ModifiedDate = DateTime.Now;
            
        //    await _context.SaveChangesAsync();

        //    return true;
        //}

        //public async Task<bool> UpdateDetail(UserDetailsBaseAdminModel userDetailsBaseAdminModel, int operatingUserId)
        //{
        //    UserDetailsTbl userDetailsTbl = await _context.UserDetailsTbl
        //        .Where(ud =>
        //            ud.UserId == userDetailsBaseAdminModel.UserId
        //            && !ud.IsDeleted)
        //        .SingleOrDefaultAsync();

        //    //if no user is found then show error
        //    if (userDetailsTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

        //    //populate table objects
        //    _mapper.Map(userDetailsBaseAdminModel, userDetailsTbl);

        //    userDetailsTbl.ModifiedBy = operatingUserId;
        //    userDetailsTbl.ModifiedDate = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return true;
        //}

        //public async Task<bool> UpdateDetailForLoggedIn(UserDetailsBaseModel userDetailsBaseModel, int operatingUserId)
        //{
        //    UserDetailsTbl userDetailsTbl = await _context.UserDetailsTbl
        //        .Where(ud =>
        //            ud.UserId == userDetailsBaseModel.UserId
        //            && !ud.IsDeleted)
        //        .SingleOrDefaultAsync();

        //    //if no user is found then show error
        //    if (userDetailsTbl == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

        //    //populate table objects
        //    userDetailsTbl.UserFirstName = userDetailsBaseModel.UserFirstName;
        //    userDetailsTbl.UserLastName = userDetailsBaseModel.UserLastName;
        //    userDetailsTbl.UserEmail = userDetailsBaseModel.UserEmail;

        //    userDetailsTbl.ModifiedBy = operatingUserId;
        //    userDetailsTbl.ModifiedDate = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return true;
        //}

        //public async Task Delete(int id, int operatingUserId)
        //{
        //    var ud = await _context.UserDetailsTbl.SingleOrDefaultAsync(x => x.UserId == id);

        //    //if no user is found then show error
        //    if ( ud == null) { throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND); }

        //    ud.IsDeleted = true;
        //    ud.ModifiedBy = operatingUserId;
        //    ud.ModifiedDate = DateTime.Now;

        //    await _context.SaveChangesAsync();
        //}

        // private helper methods
    }
}