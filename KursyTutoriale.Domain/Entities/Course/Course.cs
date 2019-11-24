using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Course : BaseEntity
    {
        public Course()
        {
            Tags = new List<Tag>();
            Modules = new List<CourseModule>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfLastEdit { get; set; }
        public int Popularity { get; set; }
        public double Rating { get; set; }
        public float Price { get; set; }
        public ICollection<Tag>Tags { get; set; }
        public ICollection<CourseModule> Modules { get; set; }
    }
}
