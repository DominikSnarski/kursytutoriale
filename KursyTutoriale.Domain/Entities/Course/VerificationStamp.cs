using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class VerificationStamp
    {
        public enum StampStatus
        {
            pending = 0,
            verified = 1,
            rejected = 2
        }
        public Guid CourseId { get; set; }
        public int Index { get; set; }
        public StampStatus Status { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
    }
}
