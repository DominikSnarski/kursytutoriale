using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services.Payment
{
    class PaymentCustomerService : IPaymentCustomerService
    {
        private IExtendedRepository<PaymentCustomer> customerRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private IDTOMapper mapper;

        public PaymentCustomerService(
            IExtendedRepository<PaymentCustomer> customerRepository,
            IExecutionContextAccessor executionContextAccessor,
            IDTOMapper mapper)
        {
            this.customerRepository = customerRepository;
            this.executionContextAccessor = executionContextAccessor;
            this.mapper = mapper;
        }

        public List<CreditCardDto> GetCreditCards()
        {
            var userId = executionContextAccessor.GetUserId();

            var customer = customerRepository.Queryable().Include(c => c.CreditCards).FirstOrDefault(c => c.UserId == userId);

            var creditCards = customer.CreditCards;

            return mapper.Map<List<CreditCardDto>>(creditCards);
        }
    }
}
