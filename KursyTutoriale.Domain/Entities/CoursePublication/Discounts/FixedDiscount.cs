using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    class FixedDiscount : Discount
    {
        public int Amount { get; private set; }

        public FixedDiscount(Guid courseId, string code, DateTime validTo, int amount) : base(courseId, code, validTo)
        {
            Amount = amount;
        }

        public override int GetAmountAfterDiscount(int amount)
        {
            return amount - Amount;
        }
    }
}
