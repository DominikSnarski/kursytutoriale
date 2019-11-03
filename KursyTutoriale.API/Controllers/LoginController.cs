using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        AccountManager accountManager;
        public LoginController(AccountManager accountManager)
        {
            this.accountManager = accountManager;
        }
        [HttpGet]
        public void SignUp()
        {
            return;
        }

        public async Task<IdentityResult> SignUpAsync(string username, string password, string email)
        {
            var user = new ApplicationUser
            {
                UserName = username,
                Email = email
            };

            var result = await accountManager.CreateAccountAsync(user, password);
            return result;
        }

    }
}