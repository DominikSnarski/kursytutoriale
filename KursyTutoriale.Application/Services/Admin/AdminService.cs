using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Moderation;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Admin
{
    class AdminService : IAdminService
    {
        UserManager<ApplicationUser> userManager;
        IExtendedRepository<ModeratorProfile> moderatorRepo;
        IUnitOfWork unitOfWork;

        public AdminService(
            UserManager<ApplicationUser> userManager,
            IExtendedRepository<ModeratorProfile> moderatorRepo,
            IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.moderatorRepo = moderatorRepo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<bool> CreateModeratorProfile(Guid userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
                throw new Exception($"User with id: {userId}. Doesnt exists");

            var moderatorProfile = moderatorRepo.Queryable().SingleOrDefault(mp => mp.UserId == userId);
            if (moderatorProfile != null)
                return false;

            await userManager.AddToRoleAsync(user, "Moderator");
            
            moderatorProfile = new ModeratorProfile(userId);

            moderatorRepo.Insert(moderatorProfile);

            await unitOfWork.SaveChangesAsync();
            
            return true;
        }
    }
}
