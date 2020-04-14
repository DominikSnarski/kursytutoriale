using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class CourseProgress
    {
        private CourseProgress()
        {

        }

        public CourseProgress(Guid UserId, Guid LessonId)
        {
            this.UserId = UserId;
            this.LessonId = LessonId;
        }
        public Guid Id { get; private set; }
        public Guid UserId { get; set; }
        public Guid LessonId { get; set; }
    }
}
