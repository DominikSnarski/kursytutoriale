using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication.Discounts
{
    public abstract class Discount
    {
        protected Discount(Guid courseId, string code, DateTime validTo)
        {
            CourseId = courseId;
            Code = code;
            ValidTo = validTo;
        }

        public Guid CourseId { get; set; }
        public string Code { get; set; }
        public DateTime ValidTo { get; set; }

        public bool ValidateCode(string code) => Code == code && DateTime.UtcNow <= ValidTo;

        public abstract int GetAmountAfterDiscount(int amount);
    }
}
