using System;
using System.Collections.Generic;

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

        public Lesson(Guid id, int courseModuleIndex, string title, int index)
        {
            Id = id;
            CourseModuleIndex = courseModuleIndex;
            Title = title;
            Index = index;
            Content = new List<LessonPart>();
        }

        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public int CourseModuleIndex { get; set; }
        public string Title { get; set; }
        public int Index { get; set; }
        public List<LessonPart> Content { get; set; }

        public void AddPart(LessonPart lessonPart)
        {
            lessonPart.Idex = Content.Count;
            Content.Add(lessonPart);
        }

        public void AddPartRange(IEnumerable<LessonPart> lessonParts)
        {
            foreach (var lessonPart in lessonParts)
                AddPart(lessonPart);
        }
    }
}
