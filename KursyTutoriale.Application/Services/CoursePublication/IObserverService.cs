using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface IObserverService
    {
        Task AddObserver(Guid courseId);
        Task RemoveObserver(Guid courseId);
        bool IsObserving(Guid courseId);
    }
}