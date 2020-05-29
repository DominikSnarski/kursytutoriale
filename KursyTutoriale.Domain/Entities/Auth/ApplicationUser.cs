using KursyTutoriale.Domain.Entities.Course;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Auth
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser() { Id = Guid.NewGuid(); }
        public Guid UserProfileId { get; set; }

        public Guid EmailActivationCode { get; set; }

    }
}
