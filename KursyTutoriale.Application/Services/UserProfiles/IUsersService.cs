using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.UserProfiles
{
    public interface IUsersService
    {
        UserProfileDTO GetProfile(Guid id);
        public IEnumerable<UserProfileListItemDTO> GetProfilesByName(string query);
        Task<bool> IsEmailConfirmed();
    }
}
