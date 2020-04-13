using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseParticipantDTO
    {
        public Guid CourseId { get; set; }
        public Guid UserId { get; set; }
    }
}
