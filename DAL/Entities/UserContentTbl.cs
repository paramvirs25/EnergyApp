using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public partial class UserContentTbl
    {
        public int UserId { get; set; }
        public int ContentId { get; set; }
        public byte IsComplete { get; set; }

        public ContentTbl Content { get; set; }
        public UsersTbl User { get; set; }
    }
}
