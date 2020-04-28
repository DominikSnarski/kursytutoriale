using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.CoursePreview
{
    public class CoursePreview
    {
        private List<LessonPreview> lessonPreviews;

        private CoursePreview()
        {
            lessonPreviews = new List<LessonPreview>();
        }

        public CoursePreview(Guid id)
        {
            Id = id;
            lessonPreviews = new List<LessonPreview>();
        }

        public IReadOnlyCollection<LessonPreview> LessonPreviews { get => lessonPreviews.AsReadOnly(); }

        public Guid Id { get; private set; }

        public void AddToPreview(Guid lessonId)
        {
            if (lessonPreviews.Any(lp => lp.LessonId == lessonId))
                throw new Exception("Lesson already in preview");

            var newPreview = new LessonPreview(lessonId);

            lessonPreviews.Add(newPreview);
        }

        public void RemoveFromPreview(Guid lessonId)
        {
            var preview = lessonPreviews.FirstOrDefault(l => l.LessonId == lessonId);

            if (preview is null)
                throw new Exception("Lesson not in preview");

            lessonPreviews.Remove(preview);
        }
    }
}
