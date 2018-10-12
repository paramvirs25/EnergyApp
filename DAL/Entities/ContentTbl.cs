using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public partial class ContentTbl
    {
        public ContentTbl()
        {
            UserContentTbl = new HashSet<UserContentTbl>();
        }

        public int ContentId { get; set; }
        public string ContentUrl { get; set; }
        public string ContentName { get; set; }
        public string ContentType { get; set; }

        public ICollection<UserContentTbl> UserContentTbl { get; set; }
    }
}
