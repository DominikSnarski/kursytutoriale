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
        public Guid ModuleId { get; set; }

        public override Course Apply(Course entity)
        {
            var newModuleId = ModuleId == Guid.Empty ? Guid.NewGuid() : ModuleId;
            var newModule = new CourseModule(newModuleId, Title, Description);

            entity.AddModule(newModule);

            ModuleId = newModuleId;
            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
