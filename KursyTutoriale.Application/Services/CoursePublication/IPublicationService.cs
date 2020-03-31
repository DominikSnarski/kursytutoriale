using KursyTutoriale.Domain.Entities.CoursePublication;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface IPublicationService
    {
        Task<CourseVersion> PublishCourse(Guid courseId);
        Task<CourseVersion> PublishNewVersion(Guid courseId, bool isMajor);
    }
}