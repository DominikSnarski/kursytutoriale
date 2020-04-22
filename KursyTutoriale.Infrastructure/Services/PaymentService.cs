using System;

namespace KursyTutoriale.Infrastructure.Services
{
    public class MockupPaymentService : IPaymentService
    {
        public bool MakeCreditCardPayment(Guid userId, Guid creditCardId)
        {
            return true;
        }
        public bool MakeCreditCardPayment(Guid userId, string CCNumber, int CCExpMonth, int CCExpYear, int CVV)
        {
            return true;
        }
    }
}
