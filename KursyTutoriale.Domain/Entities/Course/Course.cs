using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Course : BaseEntity
    {
        private List<Lesson> lessons;

        public Course()
        {
            Tags = new List<CourseTag>();
            Modules = new List<CourseModule>();
            lessons = new List<Lesson>();
        }

        public Course(Guid id):base(id)
        {
            lessons = new List<Lesson>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfLastEdit { get; set; }

        public bool AddLesson(Lesson lesson)
        {
            lessons.Add(lesson);
            return true;
        }

        public int Popularity { get; set; }
        public double Rating { get; set; }
        public float Price { get; set; }
        public ICollection<CourseTag>Tags { get; set; }
        public ICollection<CourseModule> Modules { get; set; }
        public IReadOnlyCollection<Lesson> Lessons { get => lessons.AsReadOnly(); }
        public ICollection<VerificationStamp> VerificationStamps { get; set; }
    }
}
