using KursyTutoriale.Application.DataTransferObjects.UserProfiles;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public interface IUserProfileService
    {
        void UpdateProfile(UpdateUserProfileDto request);
    }
}
