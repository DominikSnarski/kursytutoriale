using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Auth
{
    public class ChangePasswordToken
    {
        public ChangePasswordToken()
        {
            Id = Guid.NewGuid();
            Token = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public Guid Token { get; set; }
        public string Email { get; set; }
    }
}
