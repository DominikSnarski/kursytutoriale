using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.Services.Email;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.IO;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure
{
    public interface IAccountManagerService
    {
        public Task<IdentityResult> CreateAccount(CreateUserRequestDto request);
        public Task<ApplicationUser> FindByName(string UserName);

        public Task ConfirmEmail(string code);
        public Task ForgotPassword(string email);
        public Task ChangePassword(ChangePasswordRequest request);

    }
    public class AccountManagerService : IAccountManagerService
    {
        private UserManager<ApplicationUser> userManager;
        private IExtendedRepository<UserProfile> userProfileRepository;
        private IUnitOfWork unitOfWork;
        private IExtendedRepository<UserAccountDate> userAccountDateRepository;
        private IEmailSender emailSender;
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<ChangePasswordToken> changePasswordTokenRepository;

        public AccountManagerService(
            UserManager<ApplicationUser> userManager,
            IExtendedRepository<UserProfile> userProfileRepository,
            IUnitOfWork unitOfWork,
            IExtendedRepository<UserAccountDate> userAccountDateRepository,
            IEmailSender emailSender,
            IExecutionContextAccessor executionContext,
            IExtendedRepository<ChangePasswordToken> changePasswordTokenRepository)
        {
            this.userManager = userManager;
            this.userProfileRepository = userProfileRepository;
            this.unitOfWork = unitOfWork;
            this.userAccountDateRepository = userAccountDateRepository;
            this.emailSender = emailSender;
            this.executionContext = executionContext;
            this.changePasswordTokenRepository = changePasswordTokenRepository;
        }

        public async Task<IdentityResult> CreateAccount(CreateUserRequestDto request)
        {
            var user = new ApplicationUser { UserName = request.Username, Email = request.Email, EmailActivationCode = Guid.NewGuid()};
            
            var userProfile = new UserProfile(user.Id);
            userProfile.Username = user.UserName;
            userProfile.AvatarPath = LoadDefaultAvatar();

            user.UserProfileId = userProfile.Id;

            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
                return result;

            await userManager.AddToRoleAsync(user, "User");

            userProfileRepository.Insert(userProfile);

            userAccountDateRepository.Insert(new UserAccountDate() {UserId = user.Id, Date = DateTime.Now });

            string message = "This is your code for activating your account: " + user.EmailActivationCode.ToString();

            emailSender.SendEmail(user.Email, "Email confirmation", message);

            await unitOfWork.SaveChangesAsync();

            return result;
        }

        private string LoadDefaultAvatar()
        {
            var bytes = File.ReadAllBytes("Files/default_avatar.png");
            var file = Convert.ToBase64String(bytes);

            return $"data:image/jpeg;base64,{file}";
        }

        public async Task<ApplicationUser> FindByName(string UserName)
        {
            return await userManager.FindByNameAsync(UserName);
        }

        public async Task ConfirmEmail(string code)
        {
            var userId = executionContext.GetUserId();
            if (userId == null) return;

            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return;

            if(user.EmailActivationCode.ToString().Equals(code))
            {
                user.EmailConfirmed = true;
            }

            user.EmailActivationCode = Guid.NewGuid();
     
        }

        public async Task ForgotPassword(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var token = new ChangePasswordToken() { Email = email };

            string message = "This is your code for changing password: " + token.Token.ToString();

            emailSender.SendEmail(token.Email, "Changing password", message);

            changePasswordTokenRepository.Insert(token);

            await unitOfWork.SaveChangesAsync();
        }

        public async Task ChangePassword(ChangePasswordRequest request)
        {
            var token = changePasswordTokenRepository.Queryable().FirstOrDefault(t => t.Token.ToString().Equals(request.Token));
            if (token == null) return;

            var user = await userManager.FindByEmailAsync(token.Email);
            if (user == null) return;

            if (!token.Token.ToString().Equals(request.Token))
                return;

            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);

            var result = await userManager.ResetPasswordAsync(user, resetToken, request.Password);

            changePasswordTokenRepository.Delete(token);

            await unitOfWork.SaveChangesAsync();
        }
    }
}
