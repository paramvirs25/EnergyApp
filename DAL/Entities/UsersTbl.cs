using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public partial class UsersTbl
    {
        public UsersTbl()
        {
            UserContentTbl = new HashSet<UserContentTbl>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public UserDetailsTbl UserDetailsTbl { get; set; }
        public ICollection<UserContentTbl> UserContentTbl { get; set; }
    }
}
