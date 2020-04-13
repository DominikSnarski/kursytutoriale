using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class CourseParticipantConfiguration : IEntityTypeConfiguration<CourseParticipant>
    {
        public void Configure(EntityTypeBuilder<CourseParticipant> builder)
        {
            builder.ToTable("KTCourseParticipant");
            builder.HasKey(c => c.Id);
        }
    }
}
