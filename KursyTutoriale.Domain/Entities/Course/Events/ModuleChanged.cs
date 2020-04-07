using KursyTutoriale.Domain.Base;
using KursyTutoriale.Shared.Exceptions;
using System;
using System.Linq;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class ModuleChanged : BaseEvent<Course>
    {
        public ModuleChanged(
            Guid courseId,
            string title,
            string description, 
            Guid moduleId) : base(courseId)
        {
            Title = title;
            Description = description;
            ModuleId = moduleId;
        }

        public Guid ModuleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public override Course Apply(Course entity)
        {
            var module = entity.Modules.FirstOrDefault(l => l.Id == ModuleId);

            if (module is null)
                throw new InvalidStateException("");

            module.Update(Title, Description);
            
            return entity;
        }

        public override Course Revert(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
