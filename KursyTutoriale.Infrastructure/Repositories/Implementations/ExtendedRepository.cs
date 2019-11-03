using Microsoft.EntityFrameworkCore;
using URF.Core.EF;

namespace KursyTutoriale.Infrastructure.Repositories
{
    public class ExtendedRepository<TEntity> : Repository<TEntity>, IExtendedRepository<TEntity> where TEntity: class
    {
        public ExtendedRepository(DbContext context) : base(context)
        {
        }

        public void InsertAgreggate(TEntity aggregate)
        {
            Set.Add(aggregate);
        }
    }
}
