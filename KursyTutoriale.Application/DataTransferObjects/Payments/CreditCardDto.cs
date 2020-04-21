using System;

namespace KursyTutoriale.Application.DataTransferObjects.Payments
{
    public class CreditCardDto
    {
        public Guid Id { get; set; }
        public string Last4Digits { get; set; }
    }
}
