using AutoMapper;
using WebApi.Models;
//using WebApi.Entities;
using DAL.Entities;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        /// <summary>
        /// Create a map using CreateMap - Source object -> Destination object
        /// </summary>
        public AutoMapperProfile()
        {
            CreateMap<UsersTbl, UserModel>()
                .ForSourceMember(src => src.UserDetailsTbl, opt => opt.Ignore())
                .ForSourceMember(src => src.UserContentTbl, opt => opt.Ignore())
                .ForMember(dest => dest.CheckAdminRole, opt => opt.Ignore());
            CreateMap<UserModel, UsersTbl>()
                .ForSourceMember(src => src.CheckAdminRole, opt => opt.Ignore())
                .ForMember(dest => dest.UserDetailsTbl, opt => opt.Ignore())
                .ForMember(dest => dest.UserContentTbl, opt => opt.Ignore());

            CreateMap<UserDetailsTbl, UserListModel>()
                .ForSourceMember(src => src.Role, opt => opt.Ignore())
                .ForSourceMember(src => src.User, opt => opt.Ignore())
                .ForSourceMember(src => src.UserType, opt => opt.Ignore())
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.UserTypeName, opt => opt.MapFrom(src => src.UserType.UserTypeDisplayName));

            CreateMap<UserDetailsTbl, UserDetailsModel>()
                .ForSourceMember(src => src.Role, opt => opt.Ignore())
                .ForSourceMember(src => src.User, opt => opt.Ignore())
                .ForSourceMember(src => src.UserType, opt => opt.Ignore());
            CreateMap<UserDetailsModel, UserDetailsTbl>()
                .ForMember(dest => dest.Role, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.UserType, opt => opt.Ignore());

            CreateMap<RolesTbl, RoleModel>()
                .ForSourceMember(src => src.UserDetailsTbl, opt => opt.Ignore());
            CreateMap<RoleModel, RolesTbl>()
                .ForMember(dest => dest.UserDetailsTbl, opt => opt.Ignore());

            CreateMap<UserTypesTbl, UserTypesModel>()
                .ForSourceMember(src => src.UserDetailsTbl, opt => opt.Ignore());
            CreateMap<UserTypesModel, UserTypesTbl>()
                .ForMember(dest => dest.UserDetailsTbl, opt => opt.Ignore());
        }
    }
}