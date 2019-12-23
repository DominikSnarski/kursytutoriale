using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Admin
{
    public interface IAdminService
    {
        Task<bool> CreateModeratorProfile(Guid userId);
        Task<bool> RemoveModerator(Guid moderatorId);
    }
}
