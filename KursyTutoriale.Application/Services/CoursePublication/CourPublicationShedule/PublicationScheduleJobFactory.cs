using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Spi;
using System;

namespace KursyTutoriale.Application.Services.CoursePublication.CourPublicationShedule
{
    public class PublicationScheduleJobFactory : IJobFactory
    {
        private readonly IServiceProvider _serviceProvider;
        public PublicationScheduleJobFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            return _serviceProvider.GetRequiredService(bundle.JobDetail.JobType) as IJob;
        }

        public void ReturnJob(IJob job) { }
    }
}
