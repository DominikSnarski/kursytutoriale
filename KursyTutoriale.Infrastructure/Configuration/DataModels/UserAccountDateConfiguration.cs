using KursyTutoriale.Domain.Entities.Statistics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class UserAccountDateConfiguration : IEntityTypeConfiguration<UserAccountDate>
    {
        public void Configure(EntityTypeBuilder<UserAccountDate> builder)
        {
            builder.ToTable("KTUserAccountDate");
            builder.HasKey(t => t.Id);
        }
    }
}
