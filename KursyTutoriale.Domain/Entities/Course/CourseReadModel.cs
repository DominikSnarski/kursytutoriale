using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class CourseReadModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfLastEdit { get; set; }

        public int Popularity { get; set; }
        public double Rating { get; set; }
        public float Price { get; set; }
        public ICollection<CourseTag> Tags { get; set; }
        public ICollection<CourseModuleReadModel> Modules { get; set; }
        public VerificationStamp VerificationStamp { get; set; }
        public string Image { get; set; }
    }
}
