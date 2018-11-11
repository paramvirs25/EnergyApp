using System.Collections.Generic;

namespace WebApi.Models.UserModelExtensions
{
    public class UserCreateModel
    {
        public UserModel User { get; set; }
        public UserDetailsModel UserDetail { get; set; }
        public IEnumerable<RoleModel> Roles { get; set; }
        public IEnumerable<UserTypesModel> UserTypes { get; set; }
    }
}