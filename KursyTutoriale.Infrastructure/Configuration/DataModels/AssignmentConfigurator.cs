using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Assignments;
using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    public class AssignmentConfigurator : IEntityTypeConfiguration<Assignment>
    {
        public void Configure(EntityTypeBuilder<Assignment> builder)
        {
            builder.ToTable("KTAssignment");

            builder.HasKey(ass => ass.Id);

            builder.OwnsOne(ass => ass.Rate,
                opt =>
                {
                    opt.ToTable("KTAssignmentRate");
                    opt.HasKey(rate => rate.Id);
                });
        }
    }
}
