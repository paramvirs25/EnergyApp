using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public partial class UserDetailsTbl
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int UserTypeId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }

        public RolesTbl Role { get; set; }
        public UsersTbl User { get; set; }
        public UsersTbl UserType { get; set; }
        public UserTypesTbl UserTypeNavigation { get; set; }
    }
}
