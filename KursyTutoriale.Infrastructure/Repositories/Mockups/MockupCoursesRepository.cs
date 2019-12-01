using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories.Mockups
{
    public class MockupCoursesRepository : ICoursesRepository
    {
        public List<Course> courses;
        public MockupCoursesRepository()
        {
            courses = new List<Course>();

            for (int i = 0; i < 10; i++)
            {
                Course course = new Course()
                {
                    OwnerId = Guid.NewGuid(),
                    Description = i.ToString(),
                    Date = DateTime.Now,
                    Title = i.ToString(),
                    Popularity = i * 10,
                    Rating = i / 3,
                    DateOfLastEdit = DateTime.Now,
                    Price = i

                };

                for (int j = 0; j < 5; j++)
                {
                    CourseModule module = new CourseModule()
                    {
                        Index = j,
                        Title = j.ToString()
                    };

                    for (int k = 0; k < 5; k++)
                    {
                        module.Lessons.Add(new Lesson()
                        {
                            Index = k,
                            Content = k.ToString(),
                            Title = k.ToString()
                        }) ;
                    }

                    course.Modules.Add(module);
                }

                course.Tags.Add(new CourseTag("Baking"));
                course.Tags.Add(new CourseTag("Cooking"));
                courses.Add(course);
                
            }
        }

        public void Insert(Course item)
        {
            courses.Add(item);
        }

        public IQueryable<Course> Queryable()
        {
            return courses.AsQueryable();
        }

        public void Delete(Course item)
        {
            courses.Remove(item);
        }

        public void Attach(Course item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync<TKey>(TKey keyValue, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public void Detach(Course item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync<TKey>(TKey keyValue, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<Course> FindAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<Course> FindAsync<TKey>(TKey keyValue, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }


        public void InsertAgreggate(Course aggregate)
        {
            throw new NotImplementedException();
        }

        public Task LoadPropertyAsync(Course item, Expression<Func<Course, object>> property, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public IQuery<Course> Query()
        {
            throw new NotImplementedException();
        }


        public IQueryable<Course> QueryableSql(string sql, params object[] parameters)
        {
            throw new NotImplementedException();
        }

        public void Update(Course item)
        {
            courses.RemoveAll(c => c.Id == item.Id);
            courses.Add(item);
        }
    }
}
