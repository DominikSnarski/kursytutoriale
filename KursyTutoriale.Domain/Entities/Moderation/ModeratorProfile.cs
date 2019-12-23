using System;

namespace KursyTutoriale.Domain.Entities.Moderation
{
    public class ModeratorProfile: BaseEntity
    {
        public ModeratorProfile(Guid userId)
        {
            UserId = userId;
        }

        public Guid UserId { get; set; }
    }
}
