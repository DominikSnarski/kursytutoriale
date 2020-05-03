using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Application.Services.UserProfiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserProfileController : Controller
    {
        private IUserProfileService profileService;

        public UserProfileController(IUserProfileService profileService)
        {
            this.profileService = profileService;
        }

        [HttpPut("/updateProfile")]
        public void UpdateProfile([FromBody]UpdateUserProfileDto request)
        {
            profileService.UpdateProfile(request);
        }

        [HttpGet("/getProfile")]
        public UserProfileDTO GetProfile()
        {
            return profileService.GetProfile();
        }
    }
}
