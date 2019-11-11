using KursyTutoriale.Domain.Entites;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
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

            for (int i = 0; i < 100; i++)
            {
                courses.Add(new Course()
                {
                    authorId = i.ToString(),
                    content = i.ToString(),
                    date = DateTime.Now,
                    title = i.ToString(),
                    Id = Guid.NewGuid()
                });
                
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
            throw new NotImplementedException();
        }
    }
}
