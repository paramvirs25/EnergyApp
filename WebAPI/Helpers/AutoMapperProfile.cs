using AutoMapper;
using WebApi.Models;
//using WebApi.Entities;
using DAL.Entities;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        /// <summary>
        /// Create a map using CreateMap - Source object, Destination object
        /// </summary>
        public AutoMapperProfile()
        {
            CreateMap<UsersTbl, UserModel>();
            CreateMap<UserModel, UsersTbl>();

            CreateMap<UserDetailsTbl, UserListModel>()
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.UserTypeName, opt => opt.MapFrom(src => src.UserType.UserTypeDisplayName));

            CreateMap<UserDetailsTbl, UserDetailsModel>();
            CreateMap<UserDetailsModel, UserDetailsTbl>()
                .ForMember(dest => dest.Role, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.UserType, opt => opt.Ignore());

            CreateMap<RolesTbl, RoleModel>();
            CreateMap<RoleModel, RolesTbl>();

            CreateMap<UserTypesTbl, UserTypesModel>();
            CreateMap<UserTypesModel, UserTypesTbl>();
        }
    }
}