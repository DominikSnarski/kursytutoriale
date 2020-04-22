using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface IUserProfileRepository : IExtendedRepository<UserProfile>
    {
    }
}
