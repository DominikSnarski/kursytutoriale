using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Administration
{
    public class UserBasic : BaseEntity
    {
        public UserBasic() : base() { }
        public UserBasic(Guid id) : base(id) { }

        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
