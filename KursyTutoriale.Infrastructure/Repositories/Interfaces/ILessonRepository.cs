using KursyTutoriale.Domain.Base;
using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Infrastructure.Repositories.Interfaces
{
    public interface ICourseRepository
    {
        ICollection<Course> GetAll();
        Course Find(Guid id);
        Course HandleEvent(BaseEvent<Course> @event, Course surplus);
    }
}
