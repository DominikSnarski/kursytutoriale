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
    class ObserverService : IObserverService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IUnitOfWork unitOfWork;
        private IExecutionContextAccessor executionContextAccessor;

        public ObserverService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContextAccessor)
        {
            this.profilesRepository = profilesRepository;
            this.unitOfWork = unitOfWork;
            this.executionContextAccessor = executionContextAccessor;
        }

        public async Task AddObserver(Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();

            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                throw new Exception("Cannot add observer to non-public course");

            profile.AddObserver(userId);

            await unitOfWork.SaveChangesAsync();
        }


        public async Task RemoveObserver(Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();

            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                throw new Exception("Cannot remove observer from non-public course");

            profile.RemoveObserver(userId);

            await unitOfWork.SaveChangesAsync();
        }

        public bool IsObserving(Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();
            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == courseId);
            if (profile is null)
                throw new Exception("Cannot check if is observing from non-public course");
            if (profile.Observers.FirstOrDefault(o => o.UserId == userId) != null) return true;
            else return false;

        }
    }
}
