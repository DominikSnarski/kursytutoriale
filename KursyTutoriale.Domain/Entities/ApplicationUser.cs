using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public Guid UserProfileId { get; set; }
    }
}
