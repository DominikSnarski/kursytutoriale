using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace KursyTutoriale.Tests
{
    public class AccountManagerTests
    {
        IAccountManager accountManager;
        [Fact]
        public void CreateAccountSuccess()
        {
            string userName = "Piecia";
            string email = "piecinsky@gmail.com";
            ApplicationUser user = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };
            string password = "qwerty123";
            var res = accountManager.CreateAccountAsync(user, password);
            Assert.True(res.Result.Succeeded);
            var result = accountManager.FindByNameAsync("Piecia");
            Assert.True(result.Result != null);
            Assert.Equal(result.Result.Email, email);
            Assert.Equal(result.Result.UserName, userName);
        }
        [Fact]
        public void CreateAccountWrongPasswordExpression()
        {
            string userName = "Piecia";
            string email = "piecinsky@gmail.com";
            ApplicationUser user = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };
            string password = "abc";
            var result = accountManager.CreateAccountAsync(user, password);
            Assert.True(!result.Result.Succeeded);
        }
    }
}
