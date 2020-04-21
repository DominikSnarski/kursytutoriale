using KursyTutoriale.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class PaymentCustomer
    {
        private PaymentCustomer()
        {
            creditCards = new List<CreditCard>();
            transactions = new List<Transaction>();
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

        public void AddCreditCardTransation(string CCNumber, int CCExpMonth, int CCExpYear, string ownerFirstName, string ownerLastName)
        {
            var creditCard = new CreditCard(CCNumber, CCExpMonth, CCExpYear, ownerFirstName, ownerLastName);

            var transaction = new Transaction(creditCard);

            transactions.Add(transaction);
            creditCards.Add(creditCard);
        }
        public void AddCreditCardTransation(Guid creditCardId)
        {
            var creditCard = creditCards.FirstOrDefault(cc => cc.Id == creditCardId);

            if (creditCard is null)
                throw new InvalidStateException("Credit card doesnt exist");

            var transaction = new Transaction(creditCard);

            transactions.Add(transaction);
        }
    }
}
