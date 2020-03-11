using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseModuleReadModel
    {
        public virtual Guid Id { get;  set; }
        public int Index { get; set; }
        public string Title { get;  set; }
        public string Description { get;  set; }
        public Guid CourseId { get; set; }
        public ICollection<LessonReadModel> Lessons { get; set; }
    }
}
