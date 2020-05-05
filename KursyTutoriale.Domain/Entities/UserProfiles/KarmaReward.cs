using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.UserProfiles
{
    public class KarmaReward
    {
        public KarmaReward(Guid userId, Guid entityId, int amount, KarmaRewardType rewardType)
        {
            UserId = userId;
            EntityId = entityId;
            Amount = amount;
            RewardType = rewardType;
            AcquisitionDate = DateTime.UtcNow;
        }
        public Guid UserId { get; set; }
        public Guid EntityId { get; set; }
        public int Amount { get; set; }
        public KarmaRewardType RewardType { get; set; }
        public DateTime AcquisitionDate { get; set; }
    }
}
