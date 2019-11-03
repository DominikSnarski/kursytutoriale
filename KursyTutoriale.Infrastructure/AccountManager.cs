using KursyTutoriale.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Infrastructure
{
    public interface IAccountManager
    {
        public Task<IdentityResult> CreateAccountAsync(ApplicationUser user, string password);
        public Task<ApplicationUser> FindByNameAsync(string UserName);
    }
    public class AccountManager : IAccountManager
    {
        UserManager<ApplicationUser> userManager;
        public AccountManager(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<IdentityResult> CreateAccountAsync(ApplicationUser user, string password)
        {
            var result = await userManager.CreateAsync(user, password);
            return result;
        }

        public async Task<ApplicationUser> FindByNameAsync(string UserName)
        {
            var result = await userManager.FindByNameAsync(UserName);
            return result;
        }

    }
}
