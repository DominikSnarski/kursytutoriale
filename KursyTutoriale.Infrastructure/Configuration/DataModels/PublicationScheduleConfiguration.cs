using KursyTutoriale.Domain.Entities.CoursePublication;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class PublicationScheduleConfiguration : IEntityTypeConfiguration<PublicationSchedule>
    {
        public void Configure(EntityTypeBuilder<PublicationSchedule> builder)
        {
            builder.ToTable("KTPublicationSchedule");
            builder.HasKey(p => p.Id);
        }
    }
}
