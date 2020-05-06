using KursyTutoriale.Domain.Entities.UserProfiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    public class KarmaRewardConfiguration : IEntityTypeConfiguration<KarmaReward>
    {
        public void Configure(EntityTypeBuilder<KarmaReward> builder)
        {
            builder.ToTable("KTKarmaReward");
            builder.HasKey(k => new { k.EntityId, k.UserId });
        }
    }
}
