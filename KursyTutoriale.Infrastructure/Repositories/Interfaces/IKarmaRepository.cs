using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface IKarmaRepository
    {
        void AddKarma(Guid userId, Guid entityId, int amount, KarmaRewardType rewardType);
        int GetUserKarma(Guid userId);
    }
}
