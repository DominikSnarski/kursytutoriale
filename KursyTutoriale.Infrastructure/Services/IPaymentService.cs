using System;

namespace KursyTutoriale.Infrastructure.Services
{
    public interface IPaymentService
    {
        public bool MakeCreditCardPayment(Guid userId, string CCNumber, int CCExpMonth, int CCExpYear, int CVV);
        bool MakeCreditCardPayment(Guid userId, Guid creditCardId);
    }
}
