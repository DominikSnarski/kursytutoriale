using KursyTutoriale.Domain.Entites;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.Repositories.Mockups
{
    public class MockupCoursesRepository : ICoursesRepository
    {
        public void Add(Course toAdd)
        {
            
        }

        public IEnumerable<Course> GetAll()
        {
            Course course = new Course() { content = "Tresc Get All" };
            return new List<Course>() { course};
        }

        public Course GetById(int id)
        {
            return new Course() { content = "Tresc by Id" };
        }

        public void Remove(Course toRemove)
        {
            
        }
    }
}
