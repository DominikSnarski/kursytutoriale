using KursyTutoriale.Domain.Entities.Payments.PaymentMethods;
using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class Transaction
    {
        public Guid Id { get; private set; }
        public DateTime CreateDate { get; private set; }
        public TransationStatus Status { get; private set; }
        public PaymentMethod PaymentMethod { get; private set; }

        private Transaction()
        {

        }

        public Transaction(CreditCard creditCard)
        {
            var paymentMethod = new CreditCardPayment(creditCard);

            PaymentMethod = paymentMethod;
            Status = TransationStatus.NotStarted;
            CreateDate = DateTime.UtcNow;
        }
    }
}
