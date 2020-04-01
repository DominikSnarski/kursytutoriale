using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    public class CourseConfigurator : IEntityTypeConfiguration<CourseReadModel>
    {
        public void Configure(EntityTypeBuilder<CourseReadModel> builder)
        {
            builder.ToTable("KTCourse");
            builder.HasKey(c => c.Id);
            builder.OwnsMany(c => c.Modules, m =>
            {
                m.HasKey(tt => tt.Id);
                m.ToTable("KTCourseModule");

                m.OwnsMany(module => module.Lessons, l =>
                {
                    l.ToTable("KTLesson");
                    l.HasKey(tt => tt.Id);
                });
            });
            builder.OwnsMany(c => c.Tags, t =>
            {
                t.ToTable("KTCourseTags");
                t.HasKey(tt => tt.Id);
            });
            builder.OwnsOne(c => c.VerificationStamp, t =>
            {
                t.ToTable("KTVerificationStamps");
            });
        }
    }
}
