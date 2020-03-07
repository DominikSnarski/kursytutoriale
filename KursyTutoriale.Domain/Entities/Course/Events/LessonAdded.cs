using KursyTutoriale.Domain.Base;
using System;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class LessonAdded : BaseEvent<Course>
    {
        public LessonAdded(Guid courseId, int courseModuleIndex, int index, string title, string content)
            : base(Guid.NewGuid(),DateTime.UtcNow, Guid.NewGuid())
        {
            CourseId = courseId;
            CourseModuleIndex = courseModuleIndex;
            Index = index;
            Title = title;
            Content = content;
        }

        public Guid CourseId { get; private set; }
        public int CourseModuleIndex { get; private set; }
        public int Index { get; private set; }
        public string Title { get; private set; }
        public string Content { get; private set; }

        public override Course Apply(Course entity)
        {
            
            return entity;
        }

        public override Course Revert(Course entity)
        {
            return entity;
        }
    }
}
