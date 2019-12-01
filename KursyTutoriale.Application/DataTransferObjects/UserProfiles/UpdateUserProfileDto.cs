using System;

namespace KursyTutoriale.Application.DataTransferObjects.UserProfiles
{
    public class UpdateUserProfileDto
    {
        public string Name { get; set; }
        public string SiteLink { get; set; }
        public string AvatarPath { get; set; }
        public Guid GenderId { get; set; }
    }
}
