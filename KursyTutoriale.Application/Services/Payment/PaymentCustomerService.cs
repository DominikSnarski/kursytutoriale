using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Entities.Payments.PaymentMethods;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services.Payment
{
    class PaymentCustomerService : IPaymentCustomerService
    {
        private ICourseRepository courseRepository;
        private IExtendedRepository<PaymentCustomer> customerRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private IDTOMapper mapper;

        public PaymentCustomerService(
            IExtendedRepository<PaymentCustomer> customerRepository,
            IExecutionContextAccessor executionContextAccessor,
            IDTOMapper mapper, 
            ICourseRepository courseRepository)
        {
            this.customerRepository = customerRepository;
            this.executionContextAccessor = executionContextAccessor;
            this.mapper = mapper;
            this.courseRepository = courseRepository;
        }

        public List<CreditCardDto> GetCreditCards()
        {
            var userId = executionContextAccessor.GetUserId();

            var customer = customerRepository.Queryable().Include(c => c.CreditCards).FirstOrDefault(c => c.UserId == userId);

            var creditCards = customer.CreditCards;

            return mapper.Map<List<CreditCardDto>>(creditCards);
        }

        public List<TransactionDto> GetTransations()
        {
            var userId = executionContextAccessor.GetUserId();

            var customer = customerRepository
                .Queryable()
                .Include(c => c.Transactions)
                .ThenInclude( t => t.OrderItems)
                .Include(c => c.Transactions)
                .ThenInclude( t => (t.PaymentMethod as CreditCardPayment).CreditCard)
                .FirstOrDefault(c => c.UserId == userId);

            var transactions = customer.Transactions
                .Select(t => new TransactionDto
                {
                    PaymentMethodDetails = t.PaymentMethod switch
                    {
                        CreditCardPayment cc => cc.CreditCard.Last4Digits,
                        _ => throw new NotImplementedException()
                    },
                    Date = t.CreateDate.Date,
                    OrderItemName = t.OrderItems.Count == 1 ?
                        t.OrderItems.FirstOrDefault().Type switch
                        {
                            OrderItemType.CourseAccess => courseRepository.Queryable().FirstOrDefault().Title,
                            _ => throw new NotImplementedException()
                        } :
                        "Multiple items",
                    Amount = t.Amount
                })
                .ToList();

            return transactions;
        }


    }
}
