using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public interface IUsersService
    {
        UserProfileDTO GetProfile(Guid id);
    }
}
