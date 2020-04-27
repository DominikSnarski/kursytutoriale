using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Payments
{
    public class DiscountCodeDto
    {
        public string Value { get; set; }
        public int Amount { get; set; }
        public DiscountCodeType Type{ get; set; }
    }
}
