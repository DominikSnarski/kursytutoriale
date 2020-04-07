using KursyTutoriale.Domain.Base;
using KursyTutoriale.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class LessonChanged : BaseEvent<Course>
    {
        public LessonChanged(
            Guid courseId,
            Guid lessonId,
            List<LessonPart> lessonParts,
            string title,
            string description) : base(courseId)
        {
            LessonId = lessonId;
            LessonParts = lessonParts;
            Title = title;
            Description = description;
        }

        public Guid LessonId { get; set; }
        public List<LessonPart> LessonParts { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public override Course Apply(Course entity)
        {
            var lesson = entity.Lessons.FirstOrDefault(l => l.Id == LessonId);

            if (lesson is null)
                throw new InvalidStateException("");

            lesson.Update(LessonParts);
            lesson.ChangeTitle(Title);
            lesson.ChangeDescription(Description);
            
            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
