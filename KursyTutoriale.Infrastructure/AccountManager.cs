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
        private IPasswordHasher<ApplicationUser> passwordHasher;
        public AccountManager()
        {
            applicationUserRepository = MockUpApplicationUserRepository.GetInstance();
            passwordHasher = new PasswordHasher<ApplicationUser>();
        }
        public IdentityResult CreateAccount(ApplicationUser user, string password)
        {
            user.PasswordHash = passwordHasher.HashPassword(user, password);
            applicationUserRepository.Insert(user);
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
