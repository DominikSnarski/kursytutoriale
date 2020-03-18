using KursyTutoriale.Domain.Base;
using System;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class LessonAdded : BaseEvent<Course>
    {
        public LessonAdded(
            int courseModuleIndex,
            int index,
            string title,
            string content,
            Guid moduleId,
            Guid courseId)
            : base(courseId)
        {
            ModuleId = moduleId;
            CourseModuleIndex = courseModuleIndex;
            Index = index;
            Title = title;
            Content = content;
        }

        public int CourseModuleIndex { get; private set; }
        public int Index { get; private set; }
        public string Title { get; private set; }
        public string Content { get; private set; }

        public Guid ModuleId { get; set; }
        public Guid LessonId { get; set; }

        public override Course Apply(Course entity)
        {
            var newLessonId = LessonId == Guid.Empty ? Guid.NewGuid() : LessonId;
            var lesson = new Lesson(newLessonId, CourseModuleIndex, Title, Content, Index);

            entity.AddLesson(lesson, ModuleId);

            LessonId = newLessonId;

            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
