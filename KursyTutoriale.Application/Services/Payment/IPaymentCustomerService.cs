using KursyTutoriale.Application.DataTransferObjects.Payments;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Services.Payment
{
    public interface IPaymentCustomerService
    {
        List<CreditCardDto> GetCreditCards();
    }
}