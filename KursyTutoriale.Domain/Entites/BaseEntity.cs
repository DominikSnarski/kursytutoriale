using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Data
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}
