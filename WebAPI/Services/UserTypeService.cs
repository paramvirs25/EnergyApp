using System.Collections.Generic;
using AutoMapper;
using WebApi.Models;
using DAL.Entities;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface IUserTypeService
    {
        Task<IEnumerable<UserTypesModel>> GetAll();
    }

    public class UserTypeService : IUserTypeService
    {
        private DataContext _context;
        private IMapper _mapper;

        public UserTypeService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserTypesModel>> GetAll()
        {
            return MapFromDAL(await _context.UserTypesTbl.ToListAsync());
        }

        public List<UserTypesModel> MapFromDAL(List<UserTypesTbl> utt)
        {
            List<UserTypesModel> utm = new List<UserTypesModel>();
            foreach (UserTypesTbl ut in utt)
            {
                utm.Add(MapFromDAL(ut));
            }

            return utm;
        }

        public UserTypesModel MapFromDAL(UserTypesTbl ut)
        {
            return new UserTypesModel()
            {
                UserTypeId = ut.UserTypeId,
                UserTypeName = ut.UserTypeName,
                UserTypeDisplayName = ut.UserTypeDisplayName
            };
        }
    }
}