﻿using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Application.Services.Payment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [Authorize]
        [HttpGet("GetTransactions")]
        public IEnumerable<TransactionDto> GetTransactions()
        {
            return paymentCustomerService.GetTransations();
        }

        [Authorize]
        [HttpDelete("DeleteCreditCard")]
        public void DeleteCreditCard([FromQuery]Guid creditCardId)
        {
            paymentCustomerService.DeleteCreditCard(creditCardId);
        }
    }
}
