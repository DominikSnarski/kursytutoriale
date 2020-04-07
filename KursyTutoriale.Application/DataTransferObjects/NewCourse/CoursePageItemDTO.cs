using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse
{
    public class CoursePageItemDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
        public List<string> Tags { get; set; }
    }
}
