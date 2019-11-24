using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface IApplicationUserRepository : IExtendedRepository<ApplicationUser>
    {
    }
}
