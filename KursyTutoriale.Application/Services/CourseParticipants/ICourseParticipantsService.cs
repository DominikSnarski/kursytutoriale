using KursyTutoriale.Application.DataTransferObjects.Course;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CourseParticipants
{
    public interface ICourseParticipantsService
    {
        Task<bool> JoinCourse(CourseParticipantDTO dto);
        Task<bool> LeaveCourse(CourseParticipantDTO dto);
        bool IsParticipating(CourseParticipantDTO dto);
    }
}
