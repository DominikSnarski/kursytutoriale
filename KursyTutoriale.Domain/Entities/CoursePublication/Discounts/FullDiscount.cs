using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    class FullDiscount : Discount
    {
        public FullDiscount(Guid courseId, string code, DateTime validTo) : base(courseId, code, validTo)
        {
        }

        public override int GetAmountAfterDiscount(int amount)
        {
            return 0;
        }
    }
}
