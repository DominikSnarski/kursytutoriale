using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities
{
    public class UserProfile : BaseEntity
    {
        public UserProfile() :base() { }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
    }
}
