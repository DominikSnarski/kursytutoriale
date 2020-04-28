using KursyTutoriale.Application.DataTransferObjects.Payments;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Payment
{
    public interface ITransactionService
    {
        Task PayForCourseAccess(Guid courseId, CreditCardInputDto creditCardDto, string discountCode);
        Task PayForCourseAccess(Guid courseId, Guid creditCardId, string discountCode);
    }
}