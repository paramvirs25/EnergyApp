using System.Collections.Generic;
using AutoMapper;
using WebApi.Models;
using DAL.Entities;
using System.Threading.Tasks;
using WebApi.Helpers.Authorization;

namespace WebApi.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleModel>> GetAll();
    }

    public class RoleService : IRoleService
    {
        private DataContext _context;
        private IMapper _mapper;

        public RoleService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoleModel>> GetAll()
        {
            return Role.GetAllRoles();
        }
    }
}