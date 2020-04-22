using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Statistics
{
    public class UserAccountDate:BaseEntity
    {
        public UserAccountDate() : base() { }
        public UserAccountDate(Guid id) : base(id) { }

        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
