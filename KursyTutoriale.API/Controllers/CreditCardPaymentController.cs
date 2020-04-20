using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Application.Services.Payment;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        public async Task PayForCourseAccess([FromQuery] Guid courseId, [FromBody] CreditCardDto creditCardDto)
        {
            await transactionService.PayForCourseAccess(courseId, creditCardDto);
        }
    }
}
