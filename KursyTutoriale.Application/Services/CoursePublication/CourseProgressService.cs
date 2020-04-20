using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class CourseProgressService : ICourseProgressService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IUnitOfWork unitOfWork;
        private IExecutionContextAccessor executionContextAccessor;
        private ICourseRepository courseRepository;
        private IDTOMapper mapper;

        public CourseProgressService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContextAccessor,
            ICourseRepository courseRepository,
            IDTOMapper mapper)
        {
            this.profilesRepository = profilesRepository;
            this.unitOfWork = unitOfWork;
            this.executionContextAccessor = executionContextAccessor;
            this.courseRepository = courseRepository;
            this.mapper = mapper;
        }

        public async Task MarkProgress(CourseProgressDTO dto)
        {
            if (executionContextAccessor.GetUserRoles().Contains("Admin")) return;
            var userId = executionContextAccessor.GetUserId();

            var profile = profilesRepository.Queryable().FirstOrDefault(p => p.CourseId == dto.CourseId);
            if (profile is null)
                throw new Exception("Cannot mark progress of non-public course");

            if (userId.Equals(profile.OwnerId)) return;

            profile.AddCourseProgress(new CourseProgress(userId, dto.LessonId));

            await unitOfWork.SaveChangesAsync();
        }

        public IEnumerable<CourseBasicInformationsDTO> GetUserCompletedCourses()
        {
            var userId = executionContextAccessor.GetUserId();

            List<CourseBasicInformationsDTO> courses = new List<CourseBasicInformationsDTO>();

            var profiles = profilesRepository.Queryable().Where(p => p.Observers.Any(o => o.UserId == userId)).ToList();

            if (profiles is null) return courses;

            foreach(CoursePublicationProfile profile in profiles)
            {
                var course = courseRepository.Queryable().FirstOrDefault(c => c.Id == profile.CourseId);

                int progress = GetProgress(course, profile);

                if (progress == 100) courses.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }

            return courses.AsEnumerable();

        }

        public IEnumerable<CourseBasicInformationsDTO> GetUserUncompletedCourses()
        {
            var userId = executionContextAccessor.GetUserId();

            List<CourseBasicInformationsDTO> courses = new List<CourseBasicInformationsDTO>();

            var profiles = profilesRepository.Queryable().Where(p => p.Observers.Any(o => o.UserId == userId)).ToList();

            if (profiles is null) return courses;

            foreach (CoursePublicationProfile profile in profiles)
            {
                var course = courseRepository.Queryable().FirstOrDefault(c => c.Id == profile.CourseId);

                int progress = GetProgress(course, profile);

                if (progress != 100) courses.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }

            return courses.AsEnumerable();

        }

        public int GetProgress(CourseReadModel course,CoursePublicationProfile profile)
        {
            int progress = 0;

            var userId = executionContextAccessor.GetUserId();
            if (userId.Equals(profile.OwnerId)) progress = 100;
            else
            {
                var progresses = profile.Progresses.AsQueryable().Where(pr => pr.UserId == userId);

                if (progresses != null)
                {
                    int total = 0, completed = 0;

                    foreach (CourseModuleReadModel module in course.Modules)
                    {
                        foreach (LessonReadModel lesson in module.Lessons)
                        {
                            total++;
                            if (progresses.Any(p => p.LessonId == lesson.Id))
                                completed++;
                        }
                    }

                    if (total != 0)
                        progress = ((completed * 100) / total);
                    else progress = 0;
                }
                else progress = 0;
            }

            return progress;
        }
    }
}
