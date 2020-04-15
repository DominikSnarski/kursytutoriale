using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Verification
{
    public class CourseProgressDTO
    {
        public Guid CourseId { get; set; }
        public Guid LessonId { get; set; }
    }
}
