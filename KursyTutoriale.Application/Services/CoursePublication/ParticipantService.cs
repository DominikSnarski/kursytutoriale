using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class ParticipantService : IParticipantService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IUnitOfWork unitOfWork;
        private IExecutionContextAccessor executionContextAccessor;

        public ParticipantService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContextAccessor)
        {
            this.profilesRepository = profilesRepository;
            this.unitOfWork = unitOfWork;
            this.executionContextAccessor = executionContextAccessor;
        }

        public async Task AddParticipant(Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();

            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                throw new Exception("Cannot add observer to non-public course");

            profile.AddParticipant(userId);

            await unitOfWork.SaveChangesAsync();
        }


        public async Task RemoveParticipant(Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();

            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                throw new Exception("Cannot remove observer from non-public course");

            profile.RemoveParticipant(userId);

            await unitOfWork.SaveChangesAsync();
        }

        public bool IsParticipating(Guid courseId)
        {
            if (executionContextAccessor.GetUserRoles().Contains("Admin")) return true;

            var userId = executionContextAccessor.GetUserId();
            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                return false;
            if (profile.Participants.FirstOrDefault(o => o.UserId == userId) != null) return true;
            else return false;

        }
    }
}
