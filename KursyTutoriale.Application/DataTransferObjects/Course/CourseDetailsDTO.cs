using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseDetailsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Public { get; set; }
        public bool Verified { get; set; }
        public float Price { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public int Popularity { get; set; }
        public double Rating { get; set; }
        public int Progress { get; set; }
        public ICollection<CourseTag> Tags { get; set; }
        public ICollection<CourseModuleBasicInformationsDTO> Modules { get; set; }

    }
}
