using System.Collections.Generic;

namespace WebApi.Models.UserModelExtensions
{
    public class UserEditGetModel : UserEditModel
    {
        public IEnumerable<RoleModel> Roles { get; set; }
        public IEnumerable<UserTypesModel> UserTypes { get; set; }
    }
}