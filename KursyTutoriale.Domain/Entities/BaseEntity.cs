using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.Domain.Entities
{
    public class BaseEntity
    {
        protected BaseEntity()
        {
            Id = Guid.NewGuid();
        }
        [Key]
        public Guid Id { get; }
    }
}
