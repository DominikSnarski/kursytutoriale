using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Payments
{
    public class OrderItem
    {
        public OrderItem(Guid itemId, OrderItemType type)
        {
            ItemId = itemId;
            Type = type;
        }

        public Guid Id { get; private set; }
        public Guid ItemId { get; private set; }
        public OrderItemType Type { get; private set; }
    }
}
