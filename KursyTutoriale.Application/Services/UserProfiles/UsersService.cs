using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
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
        public UsersService(
            IExtendedRepository<UserProfile> profileRepository,
            IExtendedRepository<Gender> genderRepository,
            IUnitOfWork unitOfWork,
            IDTOMapper mapper)
        {
            this.profileRepository = profileRepository;
            this.genderRepository = genderRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public UserProfileDTO GetProfile(Guid id)
        {
            var userProfile = profileRepository.Queryable().Include(up => up.Gender).Single(up => up.Id == id);

            return mapper.Map<UserProfileDTO>(userProfile);
        }
    }
}
