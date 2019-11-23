using Microsoft.AspNetCore.Identity;
using System;

namespace KursyTutoriale.Domain.Entities.Auth
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser() { Id = Guid.NewGuid(); }
        public Guid UserProfileId { get; set; }
    }
}
