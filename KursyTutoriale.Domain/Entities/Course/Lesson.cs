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

        public Lesson(Guid id, string title, int index, string description)
        {
            Id = id;
            Title = title;
            Index = index;
            Content = new List<LessonPart>();
            Description = description;
        }

        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public int Index { get; set; }
        public bool IsInPreview { get; set; }
        public List<LessonPart> Content { get; set; }

        public void AddPart(LessonPart lessonPart)
        {
            lessonPart.Index = Content.Count;
            Content.Add(lessonPart);
        }

        internal void ChangeTitle(string title)
        {
            Title = title;
        }

        public void AddPartRange(IEnumerable<LessonPart> lessonParts)
        {
            foreach (var lessonPart in lessonParts)
                AddPart(lessonPart);
        }

        public void Update(List<LessonPart> lessonParts)
        {
            Content.Clear();

            AddPartRange(lessonParts);
        }

        internal void ChangeDescription(string description)
        {
            Description = description;
        }
    }
}
