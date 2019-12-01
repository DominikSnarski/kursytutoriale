namespace KursyTutoriale.Domain.Entities.UserProfiles
{
    public class UserProfile : BaseEntity
    {
        public UserProfile() :base() { }
        public string Name { get; set; }
        public string SiteLink { get; set; }
        public string AvatarPath { get; set; }
        public Gender Gender { get; set; }
    }
}
