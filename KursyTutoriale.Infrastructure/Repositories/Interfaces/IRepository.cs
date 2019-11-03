
using System.Collections.Generic;


namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    interface IRepository<EntityType, IdType>
    {
        IEnumerable<EntityType> GetAll();
        void Add(EntityType toAdd);
        void Remove(EntityType toRemove);
        EntityType GetById(IdType id);

    }
}
