using System;

namespace KursyTutoriale.Application.DataTransferObjects.UserProfiles
{
    public class UserProfileListItemDTO
    {
        public string Username { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string AvatarPath { get; set; }
    }
}
