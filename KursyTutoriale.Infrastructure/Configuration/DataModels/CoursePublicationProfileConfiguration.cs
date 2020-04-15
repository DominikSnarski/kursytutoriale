using KursyTutoriale.Domain.Entities.CoursePublication;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class CoursePublicationProfileConfiguration : IEntityTypeConfiguration<CoursePublicationProfile>
    {
        public void Configure(EntityTypeBuilder<CoursePublicationProfile> builder)
        {
            builder.ToTable("KTCoursePublicationProfile");
            builder.HasKey(pp => pp.CourseId);
            builder.Property(pp => pp.CommentsEnabled).HasDefaultValue(true);

            builder.OwnsMany(pp => pp.Versions, config =>
            {
                config.ToTable("KTCourseVersion");
            });

            builder.OwnsMany(pp => pp.Observers, config =>
            {
                config.ToTable("KTObservers");
                config.HasKey(o => o.Id);
            });

            builder.OwnsMany(pp => pp.Comments, config =>
            {
                config.ToTable("KTComments");
                config.HasKey(o => o.Id);
            });
            builder.OwnsMany(pp => pp.Progresses, config =>
            {
                config.ToTable("KTProgresses");
                config.HasKey(o => o.Id);
            });
        }
    }
}
