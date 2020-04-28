using System;

namespace KursyTutoriale.Domain.Entities.CoursePreview
{
    public class LessonPreview
    {
        public LessonPreview(Guid lessonId)
        {
            LessonId = lessonId;
        }

        public Guid Id { get; private set; }
        public Guid LessonId { get; private set; }
    }
}
