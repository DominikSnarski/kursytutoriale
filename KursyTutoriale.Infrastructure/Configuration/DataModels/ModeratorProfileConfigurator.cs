using KursyTutoriale.Domain.Entities.Moderation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class ModeratorProfileConfigurator : IEntityTypeConfiguration<ModeratorProfile>
    {
        public void Configure(EntityTypeBuilder<ModeratorProfile> builder)
        {
            builder.ToTable("KTModeratorProfile");
            builder.HasKey(up => up.UserId);
        }
    }
}
