using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    public abstract class Discount
    {
        protected Discount()
        {

        }

        protected Discount(string code, DateTime validTo)
        {
            Code = code;
            ValidTo = validTo;
        }

        public Guid Id { get; set; }
        public string Code { get; set; }
        public DateTime ValidTo { get; set; }

        public bool ValidateCode(string code) => Code == code && DateTime.UtcNow <= ValidTo;

        public void Invalidate()
        {
            ValidTo = new DateTime();
        }

        public abstract int GetAmountAfterDiscount(int amount);
    }
}
