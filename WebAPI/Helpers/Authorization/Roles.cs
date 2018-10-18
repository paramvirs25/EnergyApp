using System.Collections.Generic;
using WebApi.Models;
using System.Linq;

namespace WebApi.Helpers.Authorization
{
    public class Role
    {
        public class RoleName
        {
            public const string Agent = "Agent";
            public const string Admin = "Admin";
            public const string SuperAdmin = "SuperAdmin";
        }

        public class RoleId
        {
            public const int Agent = 100;
            public const int Admin = 200;
            public const int SuperAdmin = 300;
        }

        public static List<RoleModel> GetAllRoles()
        {
            List<RoleModel> roles = new List<RoleModel>
            {
                new RoleModel() { RoleId = RoleId.Agent, RoleName = RoleName.Agent },
                new RoleModel() { RoleId = RoleId.Admin, RoleName = RoleName.Admin },
                new RoleModel() { RoleId = RoleId.SuperAdmin, RoleName = RoleName.SuperAdmin }
            };

            return roles;
        }

        public static IEnumerable<int> GetSpecifiedAndHigherRoles(int roleId)
        {
            return GetAllRoles().FindAll(r => r.RoleId >= roleId).Select(x => x.RoleId);
        }
    }
}