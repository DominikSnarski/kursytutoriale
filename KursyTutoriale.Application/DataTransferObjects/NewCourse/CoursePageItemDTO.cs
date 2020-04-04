using System;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse
{
    class CoursePageItemDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
    }
}
