using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Lesson
    {
        public Guid CourseId { get; set; }
        public int CourseModuleIndex { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
