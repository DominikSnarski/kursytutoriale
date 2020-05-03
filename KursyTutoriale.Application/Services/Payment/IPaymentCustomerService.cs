using KursyTutoriale.Application.DataTransferObjects.Payments;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Services.Payment
{
    public interface IPaymentCustomerService
    {
        void DeleteCreditCard(Guid creditCardId);
        List<CreditCardDto> GetCreditCards();
        List<TransactionDto> GetTransations();
    }
}