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
    }
}
