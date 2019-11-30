using KursyTutoriale.Domain.Entities.Course;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface ICoursesRepository : IExtendedRepository<Course>
    {
        new void Insert(Course course);
    }
}
