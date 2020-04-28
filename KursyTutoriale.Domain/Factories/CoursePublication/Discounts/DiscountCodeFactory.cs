using KursyTutoriale.Domain.Entities.CoursePublication.Discounts;
using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Factories.CoursePublication.Discounts
{
    public class DiscountCodeFactory : IDiscountCodeFactory
    {
        public Discount CreateDiscountCode(string code, DiscountCodeType type, int amount)
        {
            return type switch
            {
                DiscountCodeType.Fixed => new FixedDiscount(code, DateTime.UtcNow.AddDays(30), amount),
                DiscountCodeType.Percentage => new PercentageDiscount(code, DateTime.UtcNow.AddDays(30), amount),
                DiscountCodeType.Full => new FullDiscount(code, DateTime.UtcNow.AddDays(30)),
                _ => throw new InvalidOperationException("Given code type is not implemented yet")
            };
        }
    }
}
