using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class PaymentCustomer
    {
        private PaymentCustomer()
        {
        }

        public PaymentCustomer(Guid userId)
        {
            UserId = userId;
            creditCards = new List<CreditCard>();
            transactions = new List<Transaction>();
        }

        private List<CreditCard> creditCards;
        private List<Transaction> transactions;

        public Guid UserId { get; set; }
        public IReadOnlyCollection<CreditCard> CreditCards{ get => creditCards.AsReadOnly(); }
        public IReadOnlyCollection<Transaction> Transactions{ get => transactions.AsReadOnly(); }

        public void AddCreditCardTransation(string CCNumber, int CCExpMonth, int CCExpYear)
        {
            var creditCard = new CreditCard(CCNumber, CCExpMonth, CCExpYear);

            var transaction = new Transaction(creditCard);

            transactions.Add(transaction);
        }
    }
}
