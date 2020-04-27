using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.Application.DataTransferObjects.Payments
{
    public class CreditCardInputDto
    {
        [Required]
        [CreditCard]
        public string Number { get; set; }

        [Required]
        [Range(1,12)]
        public int ExpMonth { get; set; }

        [Required]
        [Range(0, 3000)]
        public int ExpYear { get; set; }

        [Required]
        public int CVV { get; set; }
        [Required]
        public string OwnerLastName { get; set; }
        [Required]
        public string OwnerFirstName { get; set; }
        public string DiscountCode { get; set; }
    }

    public class CreditCardIdInputDto
    {
        [Required]
        public Guid CreditCardId { get; set; }
        public string? DiscountCode { get; set; }
    }
}
