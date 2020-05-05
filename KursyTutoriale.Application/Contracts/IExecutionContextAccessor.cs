using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Contracts
{
    public interface IExecutionContextAccessor
    {
        bool IsAuthorized { get; }
        Guid GetUserId();
        IEnumerable<string> GetUserRoles();
        bool TryGetUserId(out Guid userId);
    }
}
