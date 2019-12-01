using System;

namespace KursyTutoriale.Application.DataTransferObjects.UserProfiles
{
    public class UpdateUserProfileDto
    {
        public string Name { get; set; }
        public string SiteLink { get; set; }
        public int Age { get; set; }
        public Guid GenderId { get; set; }
    }
}
