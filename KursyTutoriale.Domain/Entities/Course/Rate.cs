using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Rate : BaseEntity
    {
        public Guid CourseId { get; set; }
        public Guid UserId { get; set; }
        public float Rating { get; set; }
    }
}
