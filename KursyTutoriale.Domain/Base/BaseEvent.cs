using System;

namespace KursyTutoriale.Domain.Base
{
    public abstract class BaseEvent<TEntity> 
    {
        protected BaseEvent(Guid entityId)
        {
            EntityId = entityId;
            Id = Guid.NewGuid();
            OccuranceDate = DateTime.UtcNow;
        }

        protected BaseEvent(Guid id, DateTime date, Guid entityId)
        {
            Id = id;
            OccuranceDate = date;
            EntityId = entityId;
        }

        public Guid Id { get; private set; }
        public Guid EntityId { get; private set; }
        public DateTime OccuranceDate { get; private set; }

        public abstract TEntity Apply(TEntity entity);

        public abstract TEntity Revert(TEntity entity);
    }
}
