using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Contracts
{
    public interface IExecutionContextAccessor
    {
        Guid GetUserId();
        IEnumerable<string> GetUserRoles();
    }
}
