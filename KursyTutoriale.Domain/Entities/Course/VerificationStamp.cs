using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class VerificationStamp
    {
        public Guid CourseId { get; set; }
        public int Index { get; set; }
        public StampStatus Status { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
    }
}
