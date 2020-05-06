using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class VerificationStamp : BaseEntity
    {
        public VerificationStamp()
        {
            Status = StampStatus.Unverified;
            Date = DateTime.UtcNow;
        }
        public StampStatus Status { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
        public Guid ModVerifierId { get; set; }
    }
}
