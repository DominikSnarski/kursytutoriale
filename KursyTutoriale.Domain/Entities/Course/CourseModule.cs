using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseModule
    {
        private List<Lesson> lessons;

        public virtual Guid Id { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid CourseId { get; set; }
        public byte[] ImageByteArray { get; set; }
        public IReadOnlyCollection<Lesson> Lessons { get => lessons.AsReadOnly(); }

        public CourseModule()
        {
            lessons = new List<Lesson>();
        }

        public CourseModule(Guid id)
        {
            Id = id;
            lessons = new List<Lesson>();
        }

        public virtual bool AddLesson(Lesson lesson)
        {
            if (lessons.Any(m => m.Id == lesson.Id))
                return false;

            lesson.Index = lessons.Count;
            lessons.Add(lesson);
            return true;
        }
    }
}
