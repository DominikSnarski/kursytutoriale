using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure
{
    public interface IAccountManagerService
    {
        public Task<IdentityResult> CreateAccount(CreateUserRequestDto request);
        public Task<ApplicationUser> FindByName(string UserName);
    }
    public class AccountManagerService : IAccountManagerService
    {
        private UserManager<ApplicationUser> userManager;
        private IExtendedRepository<UserProfile> userProfileRepository;
        private IUnitOfWork unitOfWork;

        public AccountManagerService(
            UserManager<ApplicationUser> userManager,
            IExtendedRepository<UserProfile> userProfileRepository, 
            IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.userProfileRepository = userProfileRepository;
            this.unitOfWork = unitOfWork;
        }
        public async Task<IdentityResult> CreateAccount(CreateUserRequestDto request)
        {
            var userProfile = new UserProfile();
            var user = new ApplicationUser { UserName = request.Username, Email = request.Email };

            user.UserProfileId = userProfile.Id;

            var result = await userManager.CreateAsync(user, request.Password);
            userProfileRepository.Insert(userProfile);

            await unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<ApplicationUser> FindByName(string UserName)
        {
            return await userManager.FindByNameAsync(UserName);
        }
    }
}
