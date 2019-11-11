using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Data
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
