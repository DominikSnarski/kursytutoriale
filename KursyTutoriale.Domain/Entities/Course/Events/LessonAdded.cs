using KursyTutoriale.Domain.Base;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class LessonAdded : BaseEvent<Course>
    {
        public LessonAdded(
            int courseModuleIndex,
            int index,
            string title,
            Guid moduleId,
            Guid courseId,
            List<LessonPart> lessonParts)
            : base(courseId)
        {
            ModuleId = moduleId;
            CourseModuleIndex = courseModuleIndex;
            Index = index;
            Title = title;
            LessonParts = lessonParts;
        }

        public int CourseModuleIndex { get; private set; }
        public int Index { get; private set; }
        public string Title { get; private set; }

        public Guid ModuleId { get; set; }
        public Guid LessonId { get; set; }
        public List<LessonPart> LessonParts { get; set; }

        public override Course Apply(Course entity)
        {
            var newLessonId = LessonId == Guid.Empty ? Guid.NewGuid() : LessonId;
            var lesson = new Lesson(newLessonId, CourseModuleIndex, Title, Index);

            lesson.AddPartRange(LessonParts);

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
