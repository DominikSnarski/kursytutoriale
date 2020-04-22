using System;

namespace KursyTutoriale.Domain.Entities.Payments.PaymentMethods
{
    public class CreditCardPayment : PaymentMethod
    {
        private CreditCardPayment()
        {

        }

        public CreditCardPayment(CreditCard creditCard)
        {
            Type = Shared.PaymentType.CreditCard;
            CreditCard = creditCard;
        }

        public CreditCard CreditCard { get; set; }

        public override PaymentMethodData GetData()
        {
            return new PaymentMethodData(Type.ToString(), new { CreditCard.Last4Digits });
        }
    }
}
