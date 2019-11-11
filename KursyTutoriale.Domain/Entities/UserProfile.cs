using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
    }
}
