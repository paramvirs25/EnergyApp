using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public partial class UsersTbl
    {
        public UsersTbl()
        {
            UserContentTbl = new HashSet<UserContentTbl>();
            UserDetailsTblUserType = new HashSet<UserDetailsTbl>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public UserDetailsTbl UserDetailsTblUser { get; set; }
        public ICollection<UserContentTbl> UserContentTbl { get; set; }
        public ICollection<UserDetailsTbl> UserDetailsTblUserType { get; set; }
    }
}
