﻿//using KursyTutoriale.Domain;
//using KursyTutoriale.Domain.Entities;
//using KursyTutoriale.Domain.Entities.Auth;
//using KursyTutoriale.Infrastructure;
//using KursyTutoriale.Infrastructure.Repositories;
//using Microsoft.AspNetCore.Identity;
//using System;
//using System.Collections.Generic;
//using System.Text;
//using Xunit;

//namespace KursyTutoriale.Tests
//{
//    public class AccountManagerTests
//    {
//        IAccountManagerService accountManager;
//        [Fact]
//        public void CreateAccountSuccess()
//        {
//            accountManager = new AccountManagerService(new MockUpApplicationUserRepository(),
//                                                new MockUpUserProfileRepository());
//            string userName = "Piecia";
//            string email = "piecinsky@gmail.com";
//            ApplicationUser user = new ApplicationUser
//            {
//                UserName = userName,
//                Email = email
//            };
//            string password = "qwerty123";
//            accountManager.CreateAccount(user, password);
//            ApplicationUser appUser = accountManager.FindByName("Piecia");
//            Assert.True(appUser != null);
//            Assert.Equal(appUser.Email, email);
//            Assert.Equal(appUser.UserName, userName);
//        }
//    }
//}
