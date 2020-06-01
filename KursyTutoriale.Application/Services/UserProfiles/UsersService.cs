using System;
using System.Collections.Generic;
using System.Linq;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using URF.Core.Abstractions;
using Microsoft.AspNetCore.Identity;
using KursyTutoriale.Domain.Entities.Auth;
using System.Threading.Tasks;
using KursyTutoriale.Application.Contracts;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public class UsersService : IUsersService
    {
        private IExtendedRepository<UserProfile> profileRepository;
        private IExtendedRepository<Gender> genderRepository;
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private IKarmaRepository karmaRepository;
        private UserManager<ApplicationUser> userManager;
        private IExecutionContextAccessor executionContext;
        public UsersService(
            IExtendedRepository<UserProfile> profileRepository,
            IExtendedRepository<Gender> genderRepository,
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            IKarmaRepository karmaRepository,
            UserManager<ApplicationUser> userManager,
            IExecutionContextAccessor executionContext)
        {
            this.profileRepository = profileRepository;
            this.genderRepository = genderRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.karmaRepository = karmaRepository;
            this.userManager = userManager;
            this.executionContext = executionContext;
        }
        public UserProfileDTO GetProfile(Guid id)
        {
            var userProfile = profileRepository.Queryable().Include(up => up.Gender).Single(up => up.Id == id);

            UserProfileDTO result = mapper.Map<UserProfileDTO>(userProfile);

            result.Karma = karmaRepository.GetUserKarma(id);

            return result;
        }
        public IEnumerable<UserProfileListItemDTO> GetProfilesByName(string query)
        {
            if (String.IsNullOrWhiteSpace(query)) return new List<UserProfileListItemDTO>();
            var users = profileRepository.Queryable().Where(
                u => u.Username != null ? u.Username.ToUpper().Contains(query.ToUpper()) : false ||
                u.Name != null ? u.Name.ToUpper().Contains(query.ToUpper()) : false);

            return mapper.Map<IEnumerable<UserProfileListItemDTO>>(users.AsEnumerable());
        }

        public async Task<bool> IsEmailConfirmed()
        {
            var userId = executionContext.GetUserId();
            if (userId == null) return false;

            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;

            return user.EmailConfirmed;
        }
    }
}
