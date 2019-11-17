using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System.Linq;

namespace KursyTutoriale.Infrastructure
{
    public interface IAccountManagerService
    {
        public void CreateAccount(ApplicationUser user, string password);
        public ApplicationUser FindByName(string UserName);
    }
    public class AccountManagerService : IAccountManagerService
    {
        private IApplicationUserRepository applicationUserRepository;
        private IUserProfileRepository userProfileRepository;
        public AccountManagerService(IApplicationUserRepository applicationUserRepository,
                              IUserProfileRepository userProfileRepository)
        {
            this.applicationUserRepository = applicationUserRepository;
            this.userProfileRepository = userProfileRepository;
        }
        public void CreateAccount(ApplicationUser user, string password)
        {
            UserProfile userProfile = new UserProfile();
            user.UserProfileId = userProfile.Id;
            applicationUserRepository.Insert(user);
            userProfileRepository.Insert(userProfile);
        }

        public ApplicationUser FindByName(string UserName)
        {
            return applicationUserRepository.Queryable()
                .Where(e => e.UserName == UserName)
                .First<ApplicationUser>();
        }

    }
}
