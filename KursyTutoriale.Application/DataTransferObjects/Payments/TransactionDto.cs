using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Payments
{
    public class TransactionDto
    {
        public int Amount { get; set; }
        public string PaymentMethodDetails { get; set; }
        public string OrderItemName { get; set; }
        public DateTime Date { get; set; }
    }
}
