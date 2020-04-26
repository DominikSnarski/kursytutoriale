using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Application.Services.Payment;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class CreditCardPaymentController : Controller
    {
        private ITransactionService transactionService;

        public CreditCardPaymentController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpPost("PayForCourseAccess")]
        public async Task PayForCourseAccess([FromQuery] Guid courseId, [FromBody] CreditCardInputDto creditCardDto)
        {
            await transactionService.PayForCourseAccess(courseId, creditCardDto, creditCardDto.DiscountCode);
        }

        [HttpPost("PayForCourseAccess")]
        public async Task PayForCourseAccess([FromQuery] Guid courseId, [FromBody] CreditCardIdInputDto creditCardDto)
        {
            await transactionService.PayForCourseAccess(courseId, creditCardDto.CreditCardId, creditCardDto.DiscountCode);
        }
    }
}
