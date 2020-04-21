using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface IParticipantService
    {
        Task AddParticipant(Guid courseId);
        Task RemoveParticipant(Guid courseId);
        bool IsParticipating(Guid courseId);
    }
}