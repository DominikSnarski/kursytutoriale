using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.Services.CoursePublication.CourPublicationShedule
{
    public class JobData
    {
        public Guid JobId { get; set; }
        public Type JobType { get; }
        public string JobName { get; }
        public string CronExpression { get; }
        public JobData(
            Guid JobId, 
            Type JobType, 
            string JobName,
            string CronExpression)
        {
            this.JobId = JobId;
            this.JobType = JobType;
            this.JobName = JobName;
            this.CronExpression = CronExpression;
        }
    }
}
