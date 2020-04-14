using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface ICourseProgressService
    {
        Task MarkProgress(CourseProgressDTO dto);
        IEnumerable<CourseBasicInformationsDTO> GetUserCompletedCourses();
        IEnumerable<CourseBasicInformationsDTO> GetUserUncompletedCourses();
    }
}
