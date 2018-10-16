using AutoMapper;
using WebApi.Models;
//using WebApi.Entities;
using DAL.Entities;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UsersTbl, UserModel>();
            CreateMap<UserModel, UsersTbl>();

            CreateMap<UserDetailsTbl, UserDetailsModel>();
            CreateMap<UserDetailsModel, UserDetailsTbl>();
        }
    }
}