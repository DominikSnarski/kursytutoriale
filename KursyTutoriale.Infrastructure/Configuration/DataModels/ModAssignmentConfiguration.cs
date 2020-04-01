using KursyTutoriale.Domain.Entities.Moderation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class ModAssignmentConfiguration : IEntityTypeConfiguration<ModAssignment>
    {
        public void Configure(EntityTypeBuilder<ModAssignment> builder)
        {
            builder.ToTable("KTModAssignments");
            builder.HasKey(ma => ma.Id);
        }
    }
}