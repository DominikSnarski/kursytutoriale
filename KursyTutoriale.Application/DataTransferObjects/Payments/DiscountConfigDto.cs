using KursyTutoriale.Shared;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.Application.DataTransferObjects.Payments
{
    public class DiscountConfigDto
    {
        [Required]
        [EnumDataType(typeof(DiscountCodeType))]
        public DiscountCodeType Type { get; set; }

        [Required]
        public string Code { get; set; }

        public int Amount { get; set; }
    }
}
