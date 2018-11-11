using System.Collections.Generic;

namespace WebApi.Models.UserModelExtensions
{
    public class UserCreateGetModel : UserCreateModel
    {
        public IEnumerable<RoleModel> Roles { get; set; }
        public IEnumerable<UserTypesModel> UserTypes { get; set; }
    }
}