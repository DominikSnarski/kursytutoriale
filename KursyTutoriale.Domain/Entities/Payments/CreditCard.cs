using System;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class CreditCard
    {
        private CreditCard()
        {

        }

        public CreditCard(string number, int expMonth, int expYear)
        {
            Last4Digits = number.Substring(number.Length - 4);
            ExpMonth = expMonth;
            ExpYear = expYear;
        }

        public Guid Id { get; private set; }
        public string Last4Digits { get; private set; }
        public int ExpMonth { get; private set; }
        public int ExpYear { get; private set; }
    }
}
