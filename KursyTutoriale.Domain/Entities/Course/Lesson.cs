using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Lesson
    {
        public Lesson()
        {

        }

        public Lesson(Guid id)
        {
            Id = id;
        }
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public int CourseModuleIndex { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
