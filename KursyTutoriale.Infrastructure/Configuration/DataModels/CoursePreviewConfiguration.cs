using KursyTutoriale.Domain.Entities.CoursePreview;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class CoursePreviewConfiguration : IEntityTypeConfiguration<CoursePreview>
    {
        public void Configure(EntityTypeBuilder<CoursePreview> builder)
        {
            builder.ToTable("KTCoursePreview");

            builder.OwnsMany(b => b.LessonPreviews, opt =>
            {
                opt.ToTable("KTLessonPreview");
            });
        }
    }
}
