using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    class UserProfileService : IUserProfileService
    {
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<UserProfile> profileRepository;
        private IExtendedRepository<Gender> genderRepository;
        private IDTOMapper mapper;

        public UserProfileService(
            IExecutionContextAccessor executionContext,
            IExtendedRepository<UserProfile> profileRepository,
            IExtendedRepository<Gender> genderRepository,
            IUnitOfWork unitOfWork,
            IDTOMapper mapper)
        {
            this.executionContext = executionContext;
            this.profileRepository = profileRepository;
            this.genderRepository = genderRepository;
            this.mapper = mapper;
        }

        public UserProfileDTO GetProfile()
        {
            var userId = executionContext.GetUserId();

            var userProfile = profileRepository.Queryable().Include(up => up.Gender).Single(up => up.Id == userId);

            return mapper.Map<UserProfileDTO>(userProfile);
        }

        public void UpdateProfile(UpdateUserProfileDto request)
        {
            var userId = executionContext.GetUserId();

            var userProfile = profileRepository.Queryable().Single(up=>up.Id == userId);

            var newGender = genderRepository.Queryable().FirstOrDefault(g => g.Id == request.GenderId);

            userProfile.Name = request.Name;
            userProfile.SiteLink = request.SiteLink;
            userProfile.Age = request.Age;
            userProfile.ProfileDescription = request.ProfileDescription;
            userProfile.AvatarPath = request.ImageDataUrl;

            if(!(newGender is null))
                userProfile.Gender = newGender;

            profileRepository.Update(userProfile);
        }
    }
}
