using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public abstract class OrderItem
    {
        public Guid Id { get; private set; }
        public Guid ItemId { get; private set; }
        public Guid TransactionId { get; set; }
        public OrderItemType Type { get; private set; }
    }
}
