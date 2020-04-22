using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Repositories;
using System.Transactions;

namespace KursyTutoriale.Domain.Services
{
    public class PaymentDomainService
    {
        private IExtendedRepository<Transaction> transationRepository;
        private IExtendedRepository<Course> courseRepository;


    }
}
