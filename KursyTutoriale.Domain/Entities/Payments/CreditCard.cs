using System;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class CreditCard
    {
        private CreditCard()
        {

        }

        public CreditCard(string number, int expMonth, int expYear, string ownerFirstName, string ownerLastName)
        {
            Last4Digits = number.Substring(number.Length - 4);
            ExpMonth = expMonth;
            ExpYear = expYear;
            OwnerFirstName = ownerFirstName;
            OwnerLastName = ownerLastName;

            IsDeleted = false;
        }

        public void Delete()
        {
            IsDeleted = true;
        }

        public Guid Id { get; private set; }
        public string Last4Digits { get; private set; }
        public int ExpMonth { get; private set; }
        public int ExpYear { get; private set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public bool IsDeleted { get; private set; }
    }
}
