﻿using KursyTutoriale.Domain.Base;
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
            Guid moduleId)
            : base(Guid.NewGuid(),DateTime.UtcNow, Guid.NewGuid())
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

        public override Course Apply(Course entity)
        {
            var lesson = new Lesson(CourseModuleIndex, Title, Content, Index);

            entity.AddLesson(lesson, ModuleId);

            return entity;
        }

        public override Course Revert(Course entity)
        {
            return entity;
        }
    }
}
