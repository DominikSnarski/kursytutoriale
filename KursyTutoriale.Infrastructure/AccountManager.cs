using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace KursyTutoriale.Infrastructure
{
    public interface IAccountManager
    {
        public IdentityResult CreateAccount(ApplicationUser user, string password);
        public ApplicationUser FindByName(string UserName);
    }
    public class AccountManager : IAccountManager
    {
        private IApplicationUserRepository applicationUserRepository;
        private IUserProfileRepository userProfileRepository;
        public AccountManager(IApplicationUserRepository applicationUserRepository,
                              IUserProfileRepository userProfileRepository)
        {
            this.applicationUserRepository = applicationUserRepository;
            this.userProfileRepository = userProfileRepository;
        }
        public IdentityResult CreateAccount(ApplicationUser user, string password)
        {
            UserProfile userProfile = new UserProfile();
            user.UserProfileId = userProfile.Id;
            applicationUserRepository.Insert(user);
            userProfileRepository.Insert(userProfile);
            return new IdentityResult();
        }

        public ApplicationUser FindByName(string UserName)
        {
            return applicationUserRepository.Queryable()
                .Where(e => e.UserName == UserName)
                .First<ApplicationUser>();
        }

    }
}
