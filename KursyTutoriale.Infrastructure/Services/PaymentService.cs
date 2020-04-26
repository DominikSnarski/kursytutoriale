using System;

namespace KursyTutoriale.Infrastructure.Services
{
    public class MockupPaymentService : IPaymentService
    {
        public bool MakeCreditCardPayment(Guid userId, Guid creditCardId, int amount)
        {
            return true;
        }
        public bool MakeCreditCardPayment(Guid userId, string CCNumber, int CCExpMonth, int CCExpYear, int CVV, int amount)
        {
            return true;
        }
    }
}
