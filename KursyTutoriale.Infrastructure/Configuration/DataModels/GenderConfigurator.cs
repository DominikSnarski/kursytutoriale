using KursyTutoriale.Domain.Entities.UserProfiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class GenderConfigurator : IEntityTypeConfiguration<Gender>
    {
        public void Configure(EntityTypeBuilder<Gender> builder)
        {
            builder.ToTable("KTGender");
            builder.HasKey(up => up.Id);
        }
    }
}
