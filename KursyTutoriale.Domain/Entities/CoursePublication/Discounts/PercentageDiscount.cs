using KursyTutoriale.Shared.Exceptions;
using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    class PercentageDiscount : Discount
    {
        public int Percent { get; set; }
        public PercentageDiscount(Guid courseId, string code, DateTime validTo, int percent) : base(courseId, code, validTo)
        {
            if (percent <= 0 || percent > 100)
                throw new InvalidStateException("Percent cannot be lesser than 1 and greater than 100");

            Percent = percent;
        }

        public override int GetAmountAfterDiscount(int amount)
        {
            return amount * Percent / 100;
        }
    }
}
