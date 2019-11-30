using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork,IUrfUnitOfWork 
    {
        public ICoursesRepository courseRepository { get; }
        public ApplicationDbContext context;
        public UnitOfWork(ApplicationDbContext context, ICoursesRepository courseRepository)
        {
            this.courseRepository = courseRepository;
            this.context = context;
        }

        public virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
           => await context.SaveChangesAsync(cancellationToken);

        public virtual async Task<int> ExecuteSqlCommandAsync(string sql, IEnumerable<object> parameters, CancellationToken cancellationToken = default)
            => await context.Database.ExecuteSqlRawAsync(sql, parameters, cancellationToken);

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}

