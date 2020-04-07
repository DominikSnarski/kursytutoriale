using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class RateConfiguration : IEntityTypeConfiguration<Rate>
    {
        public void Configure(EntityTypeBuilder<Rate> builder)
        {
            builder.ToTable("KTRate");
            builder.HasKey(c => c.Id);
        }
    }
}
