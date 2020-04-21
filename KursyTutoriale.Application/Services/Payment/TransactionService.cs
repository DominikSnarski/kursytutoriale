using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Services;
using KursyTutoriale.Shared.Exceptions;
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

        public async Task PayForCourseAccess(Guid courseId, CreditCardInputDto creditCardDto)
        {
            await PayForCourseAccess(
                courseId,
                (userId) => paymentService.MakeCreditCardPayment(
                    userId,
                    creditCardDto.Number,
                    creditCardDto.ExpMonth,
                    creditCardDto.ExpYear,
                    creditCardDto.CVV
                    ),
                (customer) => customer.AddCreditCardTransation(
                    creditCardDto.Number,
                    creditCardDto.ExpMonth,
                    creditCardDto.ExpYear,
                    creditCardDto.OwnerFirstName,
                    creditCardDto.OwnerLastName) 
                );
        }

        public async Task PayForCourseAccess(Guid courseId, Guid creditCardId)
        {
            await PayForCourseAccess(
                courseId,
                (userId) => paymentService.MakeCreditCardPayment(
                    userId,
                    creditCardId
                    ),
                (customer) => customer.AddCreditCardTransation(creditCardId)
                );
        }

        private async Task PayForCourseAccess(Guid courseId, Func<Guid, bool> paymentMethod, Action<PaymentCustomer> addTransactionMethod)
        {
            var courseProfile = courseProfileRepository
                .Queryable()
                .FirstOrDefault(p => p.CourseId == courseId);

            var userId = executionContextAccessor.GetUserId();

            if (courseProfile is null)
                throw new InvalidStateException("Cannot join private course");

            if (!courseProfile.CanBePaidFor())
                throw new InvalidStateException("Cannot pay for free course");

            if (!courseProfile.CanJoin(userId))
                throw new InvalidStateException("Cannot join course");

            var success = paymentMethod(userId);

            if (!success)
                throw new InvalidStateException("CreditCard payment failed");

            var customer = customerRepository.Queryable().FirstOrDefault(c => c.UserId == userId);

            if (customer is null)
            {
                customer = new PaymentCustomer(userId);

                customerRepository.InsertAgreggate(customer);
            }

            addTransactionMethod(customer);
            courseProfile.Join(userId);

            await unitOfWork.SaveChangesAsync();
        }
    }
}
