using System;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit
{
    public class ChangeModuleDTO
    {
        public Guid CourseId { get; set; }
        public Guid ModuleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
