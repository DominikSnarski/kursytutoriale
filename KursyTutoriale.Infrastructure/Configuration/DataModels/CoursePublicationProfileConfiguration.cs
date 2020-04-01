using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.UserProfiles;
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

            builder.OwnsMany(pp => pp.Versions, config =>
            {
                config.ToTable("KTCourseVersion");
            });

            builder.OwnsMany(pp => pp.Observers, config =>
            {
                config.ToTable("KTObservers");
                config.HasKey(o => o.Id);
            });
        }
    }
}
