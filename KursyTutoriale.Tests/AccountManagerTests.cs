﻿using KursyTutoriale.Domain.Entities;
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
            accountManager = new AccountManager();
            string userName = "Piecia";
            string email = "piecinsky@gmail.com";
            ApplicationUser user = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };
            string password = "qwerty123";
            accountManager.CreateAccount(user, password);
            ApplicationUser appUser = accountManager.FindByName("Piecia");
            Assert.True(appUser != null);
            Assert.Equal(appUser.Email, email);
            Assert.Equal(appUser.UserName, userName);
        }
        [Fact]
        public void AccountManagerHasherSuccess()
        {
            accountManager = new AccountManager();
            string userName = "Piecia";
            string email = "piecinsky@gmail.com";
            ApplicationUser user = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };
            string password = "qwerty123";
            accountManager.CreateAccount(user, password);
            ApplicationUser appUser = accountManager.FindByName("Piecia");
            Assert.True(appUser != null);
            Assert.True(appUser.PasswordHash != password);
        }
    }
}
