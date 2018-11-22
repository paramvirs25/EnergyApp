using System;

namespace WebApi.Models
{
    public class ContentModel
    {
        public int ContentId { get; set; }
        public string ContentUrl { get; set; }
        public string ContentName { get; set; }
        public string ContentType { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
    }
}
