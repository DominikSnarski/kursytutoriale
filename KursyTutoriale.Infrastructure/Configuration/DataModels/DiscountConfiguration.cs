using KursyTutoriale.Domain.Entities.CoursePublication.Discounts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class DiscountConfiguration : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder)
        {
            builder.ToTable("KTDiscount");
            builder.HasKey(dis => dis.Id);

            builder
                .HasDiscriminator<string>("Type")
                .HasValue<FixedDiscount>("Fixed")
                .HasValue<FullDiscount>("Full")
                .HasValue<PercentageDiscount>("Percentage");
        }
    }
}
