using KursyTutoriale.Application.DataTransferObjects.Payments;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Payment
{
    public interface ITransactionService
    {
        Task PayForCourseAccess(Guid courseId, CreditCardDto creditCardDto);
    }
}