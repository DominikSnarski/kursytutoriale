using System;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class LessonDetailsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public bool IsInPreview { get; set; }
    }
}
