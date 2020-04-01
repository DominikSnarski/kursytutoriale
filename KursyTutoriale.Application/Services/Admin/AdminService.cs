using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Moderation;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
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
        private IDTOMapper mapper;

        public AdminService(
            UserManager<ApplicationUser> userManager,
            IExtendedRepository<ModeratorProfile> moderatorRepo,
            IUnitOfWork unitOfWork,
            IDTOMapper mapper)
        {
            this.userManager = userManager;
            this.moderatorRepo = moderatorRepo;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
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
            await userManager.RemoveFromRoleAsync(user, "User");

            moderatorProfile = new ModeratorProfile(userId);

            moderatorRepo.Insert(moderatorProfile);

            await unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveModerator(Guid moderatorId)
        {
            var moderatorProfile = moderatorRepo.Queryable().SingleOrDefault(m => m.UserId == moderatorId);

            if (moderatorProfile == null)
                return false;

            moderatorRepo.Delete(moderatorProfile);

            var user = await userManager.FindByIdAsync(moderatorId.ToString());

            if (user == null)
                return false;

            await userManager.RemoveFromRoleAsync(user, "Moderator");
            await userManager.AddToRoleAsync(user, "User");

            await unitOfWork.SaveChangesAsync();

            return true;
        }

        public List<UserProfileForAdminDTO> GetUsers()
        {
            return mapper.Map<List<UserProfileForAdminDTO>>(userManager.Users.ToList());
        }
    }
}
