using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseParticipant : BaseEntity
    {
        public Guid CourseId { get; set; }
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
