﻿using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
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
        private IExtendedRepository<UserAccountDate> userAccountDateRepository;

        public AccountManagerService(
            UserManager<ApplicationUser> userManager,
            IExtendedRepository<UserProfile> userProfileRepository,
            IUnitOfWork unitOfWork,
            IExtendedRepository<UserAccountDate> userAccountDateRepository)
        {
            this.userManager = userManager;
            this.userProfileRepository = userProfileRepository;
            this.unitOfWork = unitOfWork;
            this.userAccountDateRepository = userAccountDateRepository;
        }

        public async Task<IdentityResult> CreateAccount(CreateUserRequestDto request)
        {
            var user = new ApplicationUser { UserName = request.Username, Email = request.Email };
            
            var userProfile = new UserProfile(user.Id);
            userProfile.Username = user.UserName;

            user.UserProfileId = userProfile.Id;

            var result = await userManager.CreateAsync(user, request.Password);
            await userManager.AddToRoleAsync(user, "User");

            userProfileRepository.Insert(userProfile);

            userAccountDateRepository.Insert(new UserAccountDate() {UserId = user.Id, Date = DateTime.Now });

            await unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<ApplicationUser> FindByName(string UserName)
        {
            return await userManager.FindByNameAsync(UserName);
        }
    }
}
