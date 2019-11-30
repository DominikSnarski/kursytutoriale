using System;
using System.Collections.Generic;
using System.Text;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface IUrfUnitOfWork : IUnitOfWork
    {
        ICoursesRepository courseRepository { get; }
        void SaveChanges();
    }
}
