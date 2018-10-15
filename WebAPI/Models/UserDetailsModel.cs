namespace WebApi.Models
{
    public class UserDetailsModel
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int UserTypeId { get; set; }        
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
    }
}