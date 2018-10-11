using System;
using System.Collections.Generic;

namespace EFGetStarted.AspNetCore.NewDb.Entities
{
    public partial class UserTb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Zipcode { get; set; }
        public string Telephoneno { get; set; }
    }
}
