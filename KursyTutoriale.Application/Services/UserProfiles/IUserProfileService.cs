using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public interface IUserProfileService
    {
        Task UpdateProfile(UpdateUserProfileDto request);
        UserProfileDto GetProfile();
    }
}
