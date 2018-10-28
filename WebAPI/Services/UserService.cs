using System.Collections.Generic;
using System.Linq;

using WebApi.Helpers;

using AutoMapper;
using WebApi.Models;
using DAL.Entities;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<UserDetailsModel> Authenticate(string username, string password);
        //Task<IEnumerable<UserListModel>> GetAll();
        Task<IEnumerable<UserListModel>> GetList();
        Task<UserDetailsModel> GetById(int id);
        Task<UserCreateModel> AddEdit(UserCreateModel userCreateModel);
        //void Update(UserModel user, string password = null);
        //void Delete(int id);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private IMapper _mapper;

        public UserService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDetailsModel> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            //Verify username and password
            var user = await _context.UsersTbl
                .Include(udt => udt.UserDetailsTbl)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Username == username && x.Password == password);

            // check if username exists
            if (user == null)
            {
                return null;
            }
            else
            {
                // authentication successful
                return _mapper.Map<UserDetailsModel>(user.UserDetailsTbl);
            }


            // check if password is correct
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //    return null;
        }

        //public async Task<IEnumerable<UserListModel>> GetAll()
        //{
        //    var userDetailTbl = await _context.UserDetailsTbl
        //        .Include(s => s.Role)
        //        .Include(s => s.UserType)
        //        .AsNoTracking()
        //        .ToListAsync();

        //    return _mapper.Map<List<UserDetailsTbl>, IEnumerable<UserListModel>>(userDetailTbl);
        //}

        /// <summary>
        /// Gets list of all users excluding 
        /// * super admin user and 
        /// * non-active users
        /// </summary>
        /// <returns>Returns list of users</returns>
        public async Task<IEnumerable<UserListModel>> GetList()
        {
            var userDetailTbl = await _context.UserDetailsTbl
                .Where(ud => ud.IsDeleted == false && ud.UserId > 1)
                .Include(s => s.CreatedByNavigation)
                .Include(s => s.ModifiedByNavigation)
                .Include(s => s.Role)
                .Include(s => s.UserType)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<List<UserDetailsTbl>, IEnumerable<UserListModel>>(userDetailTbl);
        }

        public async Task<UserDetailsModel> GetById(int id)
        {
            var userDetailsTbl = await _context.UserDetailsTbl
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserId == id);
            return _mapper.Map<UserDetailsModel>(userDetailsTbl);
        }

        public async Task<UserCreateModel> AddEdit(UserCreateModel userCreateModel)
        {
            bool isCreateUser = userCreateModel.User.UserId == 0;

            // validation
            if (string.IsNullOrWhiteSpace(userCreateModel.User.Username) || string.IsNullOrWhiteSpace(userCreateModel.User.Password))
            {
                throw new AppException("Username and Password are required");
            }

            //check for duplicate username
            if (await _context.UsersTbl
                .AsNoTracking()
                .AnyAsync(x =>
                    x.Username == userCreateModel.User.Username
                    && x.UserId != userCreateModel.User.UserId
                    )
                )
            {
                throw new AppException("Username \"" + userCreateModel.User.Username + "\" is already taken");
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
                    .Where(u => u.UserId == userCreateModel.User.UserId)
                    .Include(udt => udt.UserDetailsTbl)
                    .SingleOrDefaultAsync();
            }

            //populate table objects
            _mapper.Map(userCreateModel.User, usersTbl);
            _mapper.Map(userCreateModel.UserDetail, usersTbl.UserDetailsTbl);

            //Save to User table and user detaisl table
            if (isCreateUser)
            {
                await _context.AddAsync(usersTbl);
            }

            await _context.SaveChangesAsync();

            //after save update models with data
            _mapper.Map(usersTbl, userCreateModel.User);
            _mapper.Map(usersTbl.UserDetailsTbl, userCreateModel.UserDetail);

            return userCreateModel;
        }

        //public void Update(UserModel userParam, string password = null)
        //{
        //    var user = _context.UsersTbl.Find(userParam.UserId);

        //    if (user == null)
        //        throw new AppException("User not found");

        //    if (userParam.Username != user.Username)
        //    {
        //        // username has changed so check if the new username is already taken
        //        if (_context.UsersTbl.Any(x => x.Username == userParam.Username))
        //            throw new AppException("Username " + userParam.Username + " is already taken");
        //    }

        //    // update user properties
        //    //user.FirstName = userParam.FirstName;
        //    //user.LastName = userParam.LastName;
        //    //user.Username = userParam.Username;

        //    // update password if it was entered
        //    //if (!string.IsNullOrWhiteSpace(password))
        //    //{
        //    //    byte[] passwordHash, passwordSalt;
        //    //    CreatePasswordHash(password, out passwordHash, out passwordSalt);

        //    //    user.PasswordHash = passwordHash;
        //    //    user.PasswordSalt = passwordSalt;
        //    //}

        //    _context.UsersTbl.Update(user);
        //    _context.SaveChanges();
        //}

        //public void Delete(int id)
        //{
        //    var user = _context.UsersTbl.Find(id);
        //    if (user != null)
        //    {
        //        _context.UsersTbl.Remove(user);
        //        _context.SaveChanges();
        //    }
        //}

        //public List<UserDetailsModel> MapFromDAL(List<UserDetailsTbl> emp)
        //{
        //    List<UserDetailsModel> udm = new List<UserDetailsModel>();
        //    foreach(UserDetailsTbl ud in emp)
        //    {
        //        udm.Add(MapFromDAL(ud));
        //    }

        //    return udm;
        //    //return emp.Select(x => MapFromDAL(x)).ToList();
        //}

        //public UserDetailsModel MapFromDAL(UserDetailsTbl ud)
        //{
        //    return new UserDetailsModel()
        //    {
        //        UserId = ud.UserId,
        //        RoleId = ud.RoleId,
        //        UserTypeId = ud.UserTypeId,
        //        UserFirstName = ud.UserFirstName,
        //        UserLastName = ud.UserLastName,
        //        UserEmail = ud.UserEmail
        //    };
        //}

        //public UserDetailsTbl MapToDAL(UserDetailsModel udm, UserDetailsTbl ud)
        //{
        //    if (ud == null)
        //    {
        //        ud = new UserDetailsTbl();
        //    }

        //    ud.UserId = udm.UserId;
        //    ud.RoleId = udm.RoleId;
        //    ud.UserTypeId = udm.UserTypeId;
        //    ud.UserFirstName = udm.UserFirstName;
        //    ud.UserLastName = udm.UserLastName;
        //    ud.UserEmail = udm.UserEmail;

        //    return ud;
        //}

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