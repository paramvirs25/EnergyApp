using System.Collections.Generic;
using System.Linq;

using WebApi.Helpers;

using AutoMapper;
using WebApi.Models;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface IUserService
    {
        UserDetailsModel Authenticate(string username, string password);
        IEnumerable<UserDetailsModel> GetAll();
        UserDetailsModel GetById(int id);
        UserModel Create(UserModel user);
        void Update(UserModel user, string password = null);
        void Delete(int id);
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

        public UserDetailsModel Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.UsersTbl.SingleOrDefault(x => x.Username == username && x.Password == password);

            // check if username exists
            if (user == null)
            {
                return null;
            }
            else
            {
                // authentication successful
                return MapFromDAL(_context.UserDetailsTbl.SingleOrDefault(x => x.UserId == user.UserId));
            }
                

            // check if password is correct
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //    return null;
        }

        public UserModel Create(UserModel userModel)
        {
            // validation
            if (string.IsNullOrWhiteSpace(userModel.Username) || string.IsNullOrWhiteSpace(userModel.Password))
                throw new AppException("Username and Password are required");

            if (_context.UsersTbl.Any(x => x.Username == userModel.Username))
                throw new AppException("Username \"" + userModel.Username + "\" is already taken");

            //byte[] passwordHash, passwordSalt;
            //CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //user.PasswordHash = passwordHash;
            //user.PasswordSalt = passwordSalt;

            _context.UsersTbl.Add(_mapper.Map<UsersTbl>(userModel));
            _context.SaveChanges();

            return _mapper.Map<UserModel>(_context.UsersTbl.SingleOrDefault(x => x.Username == userModel.Username));
        }

        public IEnumerable<UserDetailsModel> GetAll()
        {
            //Mapper.CreateMap<Student, StudentAddressDetails>();

            //var details = Mapper.Map<IEnumerable<Student>, IEnumerable<StudentAddressDetails>>(context.Students).ToList();

            //var details = Mapper.Map<IEnumerable<UserDetailsTbl>, IEnumerable<UserModel>>(_context.UserDetailsTbl).ToList();
            //return details;

            //List<UserDetailsTbl> ud = _context.UserDetailsTbl.ToList<UserDetailsTbl>();

            //return _mapper.Map<List<UserModel>>(ud);

            return MapFromDAL(_context.UserDetailsTbl.ToList());
        }

        public UserDetailsModel GetById(int id)
        {
            return _mapper.Map<UserDetailsModel>(_context.UserDetailsTbl.Find(id));
        }

        public void Update(UserModel userParam, string password = null)
        {
            var user = _context.UsersTbl.Find(userParam.UserId);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                if (_context.UsersTbl.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");
            }

            // update user properties
            //user.FirstName = userParam.FirstName;
            //user.LastName = userParam.LastName;
            //user.Username = userParam.Username;

            // update password if it was entered
            //if (!string.IsNullOrWhiteSpace(password))
            //{
            //    byte[] passwordHash, passwordSalt;
            //    CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //    user.PasswordHash = passwordHash;
            //    user.PasswordSalt = passwordSalt;
            //}

            _context.UsersTbl.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.UsersTbl.Find(id);
            if (user != null)
            {
                _context.UsersTbl.Remove(user);
                _context.SaveChanges();
            }
        }

        public List<UserDetailsModel> MapFromDAL(List<UserDetailsTbl> emp)
        {
            List<UserDetailsModel> udm = new List<UserDetailsModel>();
            foreach(UserDetailsTbl ud in emp)
            {
                udm.Add(MapFromDAL(ud));
            }

            return udm;
            //return emp.Select(x => MapFromDAL(x)).ToList();
        }

        public UserDetailsModel MapFromDAL(UserDetailsTbl ud)
        {
            return new UserDetailsModel()
            {
                UserId = ud.UserId,
                RoleId = ud.RoleId,
                UserTypeId = ud.UserTypeId,
                UserFirstName = ud.UserFirstName,
                UserLastName = ud.UserLastName,
                UserEmail = ud.UserEmail
            };
        }

        public UserDetailsTbl MapToDAL(UserDetailsModel udm, UserDetailsTbl ud)
        {
            if (ud == null)
            {
                ud = new UserDetailsTbl();
            }

            ud.UserId = udm.UserId;
            ud.RoleId = udm.RoleId;
            ud.UserTypeId = udm.UserTypeId;
            ud.UserFirstName = udm.UserFirstName;
            ud.UserLastName = udm.UserLastName;
            ud.UserEmail = udm.UserEmail;

            return ud;
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