using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public interface IUserProfileService
    {
        void UpdateProfile(UpdateUserProfileDto request);
        UserProfileDTO GetProfile();
    }
}
