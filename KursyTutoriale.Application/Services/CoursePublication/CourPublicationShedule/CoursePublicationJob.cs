using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Repositories;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    [DisallowConcurrentExecution]
    public class CoursePublicationJob : IJob
    {
        private IExtendedRepository<PublicationSchedule> scheduleRepository;
        private IPublicationService publicationService;
        public CoursePublicationJob(
            IExtendedRepository<PublicationSchedule> scheduleRepository,
            IPublicationService publicationService)
        {
            this.scheduleRepository = scheduleRepository;
            this.publicationService = publicationService;
        }
        public Task Execute(IJobExecutionContext context)
        {
            var unpublished = scheduleRepository.Queryable()
                .Where(p => p.DateOfPublication.CompareTo(DateTime.UtcNow) < 0 &&
                p.Published == false);

            List<PublicationSchedule> _unpublished = new List<PublicationSchedule>(unpublished.AsEnumerable());

            foreach (PublicationSchedule schedule in _unpublished)
            {
                schedule.Published = true;
                publicationService.PublishCourseNoDataControl(schedule.CourseId);
            }

            return Task.CompletedTask;
        }
    }
}
