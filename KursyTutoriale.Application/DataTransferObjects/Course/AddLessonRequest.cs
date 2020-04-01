using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class AddLessonRequest
    {
        public Guid CourseId { get; set; }
        public Guid ModuleId { get; set; }
        public string Title { get; set; }
        public List<LessonPartDTO> Content { get; set; }
    }
}
