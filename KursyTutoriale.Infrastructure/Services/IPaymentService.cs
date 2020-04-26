using System;

namespace KursyTutoriale.Infrastructure.Services
{
    public interface IPaymentService
    {
        bool MakeCreditCardPayment(Guid userId, string CCNumber, int CCExpMonth, int CCExpYear, int CVV, int amount);
        bool MakeCreditCardPayment(Guid userId, Guid creditCardId, int amount);
    }
}
