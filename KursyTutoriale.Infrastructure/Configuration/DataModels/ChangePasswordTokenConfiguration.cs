using KursyTutoriale.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class ChangePasswordTokenConfiguration : IEntityTypeConfiguration<ChangePasswordToken>
    {
        public void Configure(EntityTypeBuilder<ChangePasswordToken> builder)
        {
            builder.ToTable("KTChangePasswordToken");
            builder.HasKey(up => up.Id);
        }
    }
}
