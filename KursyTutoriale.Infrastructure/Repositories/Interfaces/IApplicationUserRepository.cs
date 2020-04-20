using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Repositories;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface IApplicationUserRepository : IExtendedRepository<ApplicationUser>
    {
    }
}
