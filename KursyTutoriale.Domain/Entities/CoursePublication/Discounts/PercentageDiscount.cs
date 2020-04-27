using KursyTutoriale.Shared.Exceptions;
using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    public class PercentageDiscount : Discount
    {
        private PercentageDiscount() : base()
        {

        }

        public PercentageDiscount(string code, DateTime validTo, int percent) : base(code, validTo)
        {
            if (percent <= 0 || percent > 100)
                throw new InvalidStateException("Percent cannot be lesser than 1 and greater than 100");

            Percent = percent;
        }

        public int Percent { get; set; }

        public override int GetAmountAfterDiscount(int amount)
        {
            return amount * Percent / 100;
        }
    }
}
