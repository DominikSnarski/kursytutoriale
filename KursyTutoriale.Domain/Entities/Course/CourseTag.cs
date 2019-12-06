using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseTag
    {
        public CourseTag()
        { }
        public Guid CourseId { get; set; }
        public Guid Id { get; set; }
   
    }
}
