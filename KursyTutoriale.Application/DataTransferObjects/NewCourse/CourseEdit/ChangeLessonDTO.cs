using KursyTutoriale.Application.DataTransferObjects.Course;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit
{
    public class ChangeLessonDTO
    {
        public Guid CourseId { get; set; }
        public Guid LessonId { get; set; }
        public List<LessonPartDTO> Content { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
