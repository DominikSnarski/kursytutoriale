using KursyTutoriale.Domain.Entities.CoursePublication.Discounts;
using KursyTutoriale.Shared;

namespace KursyTutoriale.Domain.Factories.CoursePublication.Discounts
{
    public interface IDiscountCodeFactory
    {
        Discount CreateDiscountCode(string code, DiscountCodeType type, int amount);
    }
}