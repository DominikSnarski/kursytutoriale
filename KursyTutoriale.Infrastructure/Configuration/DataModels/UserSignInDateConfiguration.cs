using KursyTutoriale.Domain.Entities.Statistics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class UserSignInDateConfiguration : IEntityTypeConfiguration<UserSignInDate>
    {
        public void Configure(EntityTypeBuilder<UserSignInDate> builder)
        {
            builder.ToTable("KTUserSignInDate");
            builder.HasKey(t => t.Id);
        }
    }
}
