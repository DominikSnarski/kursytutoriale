using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class LessonCreationDTO
    {
        public Guid CourseId { get; set; }
        public Guid ModuleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
