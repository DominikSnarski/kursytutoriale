using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class SurveyConfiguration : IEntityTypeConfiguration<Survey>
    {
        public void Configure(EntityTypeBuilder<Survey> builder)
        {
            builder.ToTable("KTSurvey");
            builder.HasKey(t => t.CourseId);
            
            builder.OwnsMany(t => t.Questions, opt =>
            {
                opt.ToTable("KTSurveyQuestion");
                opt.HasKey(q => q.Id);
                opt.OwnsMany(q => q.Answers, opt =>
                {
                    opt.ToTable("KTSurveyAnswer");
                });
            });
        }
    }
}
