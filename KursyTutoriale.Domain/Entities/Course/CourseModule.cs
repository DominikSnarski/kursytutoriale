using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseModule
    {
        public CourseModule()
        {
        }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid CourseId { get; set; }
        public byte[] ImageByteArray { get; set; }
    }
}
