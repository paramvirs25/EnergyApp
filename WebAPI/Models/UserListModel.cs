namespace WebApi.Models
{
    public class UserListModel : UserDetailsModel
    {
        public string CreatedByName { get; set; }
        public string ModifiedByName { get; set; }
        public string RoleName { get; set; }
        public string Username { get; set; }
        public string UserTypeName { get; set; }
    }
}