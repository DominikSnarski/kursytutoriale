using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Lesson
    {
        private Lesson()
        {

        }

        public Lesson(Guid id)
        {
            Id = id;
        }

        public Lesson(Guid id, int courseModuleIndex, string title, string content, int index)
        {
            Id = id;
            CourseModuleIndex = courseModuleIndex;
            Title = title;
            Content = content;
            Index = index;
        }

        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public int CourseModuleIndex { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Index { get; set; }
    }
}
