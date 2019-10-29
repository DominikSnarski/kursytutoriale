using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories
{
    public interface IExtendedRepository<TEntity> : IRepository<TEntity> where TEntity:class
    {
        void InsertAgreggate(TEntity aggregate);
    }
}
