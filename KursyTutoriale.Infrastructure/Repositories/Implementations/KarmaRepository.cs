using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using System;
using System.Linq;

namespace KursyTutoriale.Infrastructure.Repositories.Implementations
{
    public class KarmaRepository : IKarmaRepository
    {
        ApplicationDbContext dbContext;
        public KarmaRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        
        public int GetUserKarma(Guid userId)
        {
            var query = dbContext.KarmaRewards.Where(k => k.UserId == userId);

            int totalKarma = 0;
            foreach (KarmaReward karmaReward in query)
                totalKarma += karmaReward.Amount;

            return totalKarma;
        }

        public void AddKarma(Guid userId, Guid entityId, int amount, KarmaRewardType rewardType)
        {
            if (dbContext.KarmaRewards.Any(k => k.UserId == userId && k.EntityId == entityId))
                throw new Exception("Karma already awarded for this task");

            dbContext.KarmaRewards.Add(new KarmaReward(userId, entityId, amount, rewardType));

            dbContext.SaveChanges();
        }
    }
}
