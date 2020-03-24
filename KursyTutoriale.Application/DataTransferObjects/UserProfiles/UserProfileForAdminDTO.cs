using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.UserProfiles
{
    public class UserProfileForAdminDTO
    {
        public Guid id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
    }
}
