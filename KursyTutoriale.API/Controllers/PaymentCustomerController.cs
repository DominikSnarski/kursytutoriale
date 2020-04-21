using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Application.Services.Payment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class PaymentCustomerController : Controller
    {
        private IPaymentCustomerService paymentCustomerService;

        public PaymentCustomerController(IPaymentCustomerService paymentCustomerService)
        {
            this.paymentCustomerService = paymentCustomerService;
        }

        [Authorize]
        [HttpGet("GetCreditCards")]
        public IEnumerable<CreditCardDto> Get()
        {
            return paymentCustomerService.GetCreditCards();
        }
    }
}
