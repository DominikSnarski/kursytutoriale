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
            Status = StampStatus.Pending;
            Date = DateTime.UtcNow;
        }
        public StampStatus Status { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfModAssignment { get; set; }
        public Guid ModAssigneeId { get; set; }
        public Guid ModVerifierId { get; set; }
    }
}
