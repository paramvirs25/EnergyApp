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

            CreateMap<RolesTbl, RoleModel>();
            CreateMap<RoleModel, RolesTbl>();

            CreateMap<UserTypesTbl, UserTypesModel>();
            CreateMap<UserTypesModel, UserTypesTbl>();

            CreateMap<UserDetailsTbl, UserDetailsModel>();
            CreateMap<UserDetailsModel, UserDetailsTbl>();
                //.ForMember(dest => dest.Role, opt => opt.Ignore())
                //.ForMember(dest => dest.User, opt => opt.Ignore())
                //.ForMember(dest => dest.UserType, opt => opt.Ignore())
                //.ForMember(dest => dest.UserTypeNavigation, opt => opt.Ignore());


        }
    }
}