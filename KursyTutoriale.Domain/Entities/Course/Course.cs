using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Course : BaseEntity
    {
        private List<Lesson> lessons;
        private List<CourseModule> modules;

        public Course()
        {
            Tags = new List<Guid>();
            modules = new List<CourseModule>();
            lessons = new List<Lesson>();
        }

        public Course(Guid id):base(id)
        {
            lessons = new List<Lesson>();
            modules = new List<CourseModule>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfLastEdit { get; set; }

        public int Popularity { get; set; }
        public double Rating { get; set; }
        public float Price { get; set; }
        public ICollection<Guid> Tags { get; set; }
        public IReadOnlyCollection<Lesson> Lessons { get => lessons.AsReadOnly(); }
        public IReadOnlyCollection<CourseModule> Modules { get => modules.AsReadOnly(); }
        public VerificationStamp VerificationStamp { get; set; }

        public bool AddLesson(Lesson lesson, Guid moduleId)
        {
            var module = Modules.FirstOrDefault(m => m.Id == moduleId);

            if (module is null)
                return false;

            return module.AddLesson(lesson);
        }

        public bool AddModule(CourseModule module)
        {
            if (modules.Any(m => m.Id == module.Id))
                return false;

            module.Index = modules.Count;
            modules.Add(module);

            return true;
        }
    }
}
