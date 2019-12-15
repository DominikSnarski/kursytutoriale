using System;

namespace KursyTutoriale.Application.Contracts
{
    public interface IExecutionContextAccessor
    {
        Guid? GetUserId();
    }
}
