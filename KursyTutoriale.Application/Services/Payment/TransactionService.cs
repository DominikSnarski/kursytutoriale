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

        public async Task PayForCourseAccess(Guid courseId, CreditCardInputDto creditCardDto, string discountCode)
        {
            await PayForCourseAccess(
                courseId,
                (userId, amount) => paymentService.MakeCreditCardPayment(
                    userId,
                    creditCardDto.Number,
                    creditCardDto.ExpMonth,
                    creditCardDto.ExpYear,
                    creditCardDto.CVV,
                    amount
                    ),
                (customer, amount) => customer.AddCreditCardTransation(
                    creditCardDto.Number,
                    creditCardDto.ExpMonth,
                    creditCardDto.ExpYear,
                    creditCardDto.OwnerFirstName,
                    creditCardDto.OwnerLastName,
                    amount,
                    creditCardDto.AddCardToList
                    ),
                discountCode
                );
        }

        public async Task PayForCourseAccess(Guid courseId, Guid creditCardId, string discountCode)
        {
            await PayForCourseAccess(
                courseId,
                (userId, amount) => paymentService.MakeCreditCardPayment(
                    userId,
                    creditCardId,
                    amount
                    ),
                (customer, amount) => customer.AddCreditCardTransation(creditCardId, amount),
                discountCode
                );
        }

        private async Task PayForCourseAccess(
            Guid courseId,
            Func<Guid, int, bool> paymentMethod,
            Func<PaymentCustomer, int, Transaction> addTransactionMethod,
            string code)
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

            var price = courseProfile.GetPriceWithDiscount(code);

            var success = paymentMethod(userId, price);

            if (!success)
                throw new InvalidStateException("CreditCard payment failed");

            var customer = customerRepository.Queryable().FirstOrDefault(c => c.UserId == userId);

            if (customer is null)
            {
                customer = new PaymentCustomer(userId);

                customerRepository.InsertAgreggate(customer);
            }

            var transaction = addTransactionMethod(customer, price);
            transaction.AddCourseAccess(courseProfile);

            courseProfile.AddParticipant(userId);

            await unitOfWork.SaveChangesAsync();
        }

        public void GetTransations()
        {

        }
    }
}
