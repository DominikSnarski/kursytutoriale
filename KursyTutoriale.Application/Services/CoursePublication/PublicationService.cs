using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class PublicationService : IPublicationService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private ICourseRepository coursesRepository;
        private IUnitOfWork unitOfWork;

        public PublicationService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            ICourseRepository coursesRepository,
            IUnitOfWork unitOfWork, 
            IExecutionContextAccessor executionContextAccessor)
        {
            this.profilesRepository = profilesRepository;
            this.coursesRepository = coursesRepository;
            this.unitOfWork = unitOfWork;
            this.executionContextAccessor = executionContextAccessor;
        }

        public async Task<CourseVersion> PublishCourse(Guid courseId)
        {
            if (profilesRepository.Queryable().Any(p => p.CourseId == courseId))
                throw new Exception($"Course: {courseId} already published");

            var course = coursesRepository.Find(courseId);

            if (!course.IsVerified())
                throw new Exception("Cannot publish unverified course");

            var userId = executionContextAccessor.GetUserId();

            if (!course.HasAccess(userId))
                throw new AuthenticationException();

            var newProfile = new CoursePublicationProfile(courseId, course.OwnerId, (int)(course.Price * 100));

            profilesRepository.InsertAgreggate(newProfile);

            var result = await unitOfWork.SaveChangesAsync();

            return newProfile.GetLatestVersion();
        }

        public async Task<CourseVersion> PublishNewVersion(Guid courseId, bool isMajor)
        {
            if (!profilesRepository.Queryable().Any(p => p.CourseId == courseId))
                throw new Exception($"Course: {courseId} hasnt been published");

            var profile = profilesRepository.Queryable().First(p => p.CourseId == courseId);
            var course = coursesRepository.Find(courseId);

            if (!course.IsVerified())
                throw new Exception("Cannot publish unverified course");

            var userId = executionContextAccessor.GetUserId();
            if (!course.HasAccess(userId))
                throw new UnauthorizedAccessException();

            var newVersion = profile.PublishNewMajorVersion();

            await unitOfWork.SaveChangesAsync();

            return newVersion;
        }
    }
}
