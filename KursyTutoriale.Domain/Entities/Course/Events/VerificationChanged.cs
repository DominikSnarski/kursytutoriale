using KursyTutoriale.Domain.Base;
using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class VerificationChanged : BaseEvent<Course>
    {
        public VerificationChanged(Guid courseId,
            StampStatus newStatus,
            string newNote,
            Guid modVerifierId) 
            : base(courseId)
        {
            Status = newStatus;
            Note = newNote;
            ModVerifierId = modVerifierId;
        }
        public StampStatus Status { get; set; }
        public string Note { get; set; }
        public Guid ModVerifierId { get; set; }
        public override Course Apply(Course entity)
        {
            entity.VerificationStamp.ModVerifierId = this.ModVerifierId;
            entity.VerificationStamp.Date = this.OccuranceDate;
            entity.VerificationStamp.Note = this.Note;
            entity.VerificationStamp.Status = this.Status;

            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
