using KursyTutoriale.Domain.Base;
using System;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class ModuleAdded : BaseEvent<Course>
    {
        public ModuleAdded(Guid courseId, string title, string description) : base(courseId)
        {
            Title = title;
            Description = description;
        }

        public string Title { get; set; }
        public string Description { get; set; }

        public override Course Apply(Course entity)
        {
            var newModule = new CourseModule(Guid.NewGuid(), Title, Description);

            entity.AddModule(newModule);

            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
