using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Payments.PaymentMethods
{
    public abstract class PaymentMethod
    {
        public Guid Id { get; private set; }
        public PaymentType Type { get; protected set; }
        public abstract PaymentMethodData GetData();
    }
}
