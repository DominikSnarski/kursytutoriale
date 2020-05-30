using Microsoft.Extensions.Hosting;
using System;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface IPublicationSchedulerService : IHostedService
    {
        void SchedulePublication(DateTime dateOfPublication, Guid courseId);
    }
}
