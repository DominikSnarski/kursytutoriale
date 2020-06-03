using System;

namespace KursyTutoriale.Application.Services.CoursePublication.CourPublicationShedule
{
    public class CoursePublicationJobData : JobData
    {
        public CoursePublicationJobData(Guid JobId, Type JobType, string JobName, string CronExpression) : base(JobId, JobType, JobName, CronExpression)
        {
        }
    }
}
