using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    public class FixedDiscount : Discount
    {
        public int Amount { get; private set; }

        private FixedDiscount() : base()
        {

        }

        public FixedDiscount(string code, DateTime validTo, int amount) : base(code, validTo)
        {
            Amount = amount;
        }

        public override int GetAmountAfterDiscount(int amount)
        {
            return amount - Amount;
        }
    }
}
