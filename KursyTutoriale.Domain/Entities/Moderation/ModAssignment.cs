using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Moderation
{
    public class ModAssignment : BaseEntity
    {
        public DateTime DateOfModAssignment { get; set; }
        public Guid ModAssigneeId { get; set; }
        public ModAssignmentType Type { get; set; }
        public Guid EntityId { get; set; }
    }
}
