using URF.Core.Abstractions;

namespace KursyTutoriale.Domain.Repositories
{
    public interface IExtendedRepository<TEntity> : IRepository<TEntity> where TEntity:class
    {
        void InsertAgreggate(TEntity aggregate);
    }
}
