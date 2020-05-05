using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public class UsersService : IUsersService
    {
        private IExtendedRepository<UserProfile> profileRepository;
        private IExtendedRepository<Gender> genderRepository;
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private IKarmaRepository karmaRepository;
        public UsersService(
            IExtendedRepository<UserProfile> profileRepository,
            IExtendedRepository<Gender> genderRepository,
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            IKarmaRepository karmaRepository)
        {
            this.profileRepository = profileRepository;
            this.genderRepository = genderRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.karmaRepository = karmaRepository;
        }
        public UserProfileDTO GetProfile(Guid id)
        {
            var userProfile = profileRepository.Queryable().Include(up => up.Gender).Single(up => up.Id == id);

            UserProfileDTO result = mapper.Map<UserProfileDTO>(userProfile);

            result.Karma = karmaRepository.GetUserKarma(id);

            return result;
        }
    }
}
