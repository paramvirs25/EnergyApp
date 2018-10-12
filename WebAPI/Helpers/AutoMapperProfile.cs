using AutoMapper;
using WebApi.Dtos;
//using WebApi.Entities;
using DAL.Entities;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UsersTbl, UserDto>();
            CreateMap<UserDto, UsersTbl>();
        }
    }
}