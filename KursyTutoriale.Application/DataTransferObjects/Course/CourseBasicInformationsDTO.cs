using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseBasicInformationsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<CourseModuleBasicInformationsDTO> Modules { get; set; }
    }
}
