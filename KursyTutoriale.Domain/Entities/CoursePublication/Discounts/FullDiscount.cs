using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    public class FullDiscount : Discount
    {
        private FullDiscount() : base()
        {

        }
        public FullDiscount(string code, DateTime validTo) : base(code, validTo)
        {
        }

        public override int GetAmountAfterDiscount(int amount)
        {
            return 0;
        }
    }
}
