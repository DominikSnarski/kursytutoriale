using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application
{
    public interface IUserProfileDTOBuilder
    {
        public UserProfileDTO BuildUserProfileDTO(UserProfile userProfile);
    }
    public class UserProfileDTOBuilder : IUserProfileDTOBuilder
    {
        public UserProfileDTO BuildUserProfileDTO(UserProfile userProfile)
        {
            return new UserProfileDTO()
            {
                Name = userProfile.Name,
                Surname = userProfile.Surname,
                Description = userProfile.Description
            };
        }
    }
}
