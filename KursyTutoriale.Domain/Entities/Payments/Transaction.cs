using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.Payments.PaymentMethods;
using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class Transaction
    {
        private List<OrderItem> orderItems;

        public Guid Id { get; private set; }
        public DateTime CreateDate { get; private set; }
        public TransationStatus Status { get; private set; }
        public int Amount { get; set; }
        public PaymentMethod PaymentMethod { get; private set; }
        public IReadOnlyCollection<OrderItem> OrderItems { get => orderItems.AsReadOnly(); }

        private Transaction()
        {

        }

        public Transaction(CreditCard creditCard, int amount)
        {
            var paymentMethod = new CreditCardPayment(creditCard);

            PaymentMethod = paymentMethod;
            Status = TransationStatus.NotStarted;
            CreateDate = DateTime.UtcNow;

            Amount = amount;
            orderItems = new List<OrderItem>();
        }

        public void AddCourseAccess(CoursePublicationProfile courseProfile)
        {
            var orderItem = new OrderItem(courseProfile.CourseId, OrderItemType.CourseAccess);

            orderItems.Add(orderItem);
        }
    }
}
