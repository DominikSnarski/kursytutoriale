using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface ICourseProgressService
    {
        Task MarkProgress(CourseProgressDTO dto);
        IEnumerable<CourseBasicInformationsDTO> GetUserCompletedCourses(Guid userId);
        IEnumerable<CourseBasicInformationsDTO> GetUserUncompletedCourses(Guid userId);
        int GetProgress(CourseReadModel course, CoursePublicationProfile profile);
        int GetUserProgress(Guid userId, CourseReadModel course, CoursePublicationProfile profile);
    }
}
