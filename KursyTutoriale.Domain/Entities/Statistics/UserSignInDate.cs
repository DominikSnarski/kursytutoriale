using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Statistics
{
    public class UserSignInDate : BaseEntity
    {
        public UserSignInDate() : base() { }
        public UserSignInDate(Guid id) : base(id) { }

        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
