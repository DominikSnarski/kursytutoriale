using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Survey
    {
        public Guid CourseId { get; set; }
        public List<Question> Questions { get; set; }
    }
}
