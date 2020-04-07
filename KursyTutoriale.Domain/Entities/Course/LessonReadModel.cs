using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class LessonReadModel
    {
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public int CourseModuleIndex { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int Index { get; set; }
    }
}
