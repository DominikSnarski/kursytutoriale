using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseModule
    {
        public CourseModule()
        {
            Lessons = new List<Lesson>();
        }
        public int Index { get; set; }
        public string Title { get; set; }
        public Guid CourseId { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
    }
}
