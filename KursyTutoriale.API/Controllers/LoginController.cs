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

        [HttpPost("signUp")]
        public IdentityResult SignUp(string username, string password, string email)
        {
            var user = new ApplicationUser
            {
                UserName = username,
                Email = email
            };

            var result = accountManager.CreateAccount(user, password);
            return result;
        }

    }
}