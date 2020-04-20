using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Payment
{
    public class TransactionService : ITransactionService
    {
        private IPaymentService paymentService;
        private IExtendedRepository<CoursePublicationProfile> courseProfileRepository;
        private IExtendedRepository<PaymentCustomer> customerRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private IUnitOfWork unitOfWork;

        public TransactionService(
            IPaymentService paymentService,
            IExtendedRepository<CoursePublicationProfile> courseProfileRepository,
            IExtendedRepository<PaymentCustomer> customerRepository,
            IExecutionContextAccessor executionContextAccessor,
            IUnitOfWork unitOfWork)
        {
            this.paymentService = paymentService;
            this.courseProfileRepository = courseProfileRepository;
            this.customerRepository = customerRepository;
            this.executionContextAccessor = executionContextAccessor;
            this.unitOfWork = unitOfWork;
        }

        public async Task PayForCourseAccess(Guid courseId, CreditCardDto creditCardDto)
        {
            var courseProfile = courseProfileRepository
                .Queryable()
                .FirstOrDefault(p => p.CourseId == courseId);

            if (courseProfile is null)
                throw new Exception("Cannot join private course");

            if(!courseProfile.CanBePaidFor())
                throw new Exception("Cannot pay for free course");

            var userId = executionContextAccessor.GetUserId();

            if (!courseProfile.CanJoin(userId))
                throw new Exception("Cannot join course");

            var success = paymentService.MakeCreditCardPayment(
                userId,
                creditCardDto.Number,
                creditCardDto.ExpMonth,
                creditCardDto.ExpYear,
                creditCardDto.CVV);

            if (!success)
                throw new Exception("CreditCard payment failed");

            var customer = customerRepository.Queryable().FirstOrDefault(c => c.UserId == userId);

            if(customer is null)
            {
                customer = new PaymentCustomer(userId);

                customerRepository.InsertAgreggate(customer);
            }

            customer.AddCreditCardTransation(creditCardDto.Number, creditCardDto.ExpMonth, creditCardDto.ExpYear);
            courseProfile.Join(userId);

            await unitOfWork.SaveChangesAsync();
        }
    }
}
