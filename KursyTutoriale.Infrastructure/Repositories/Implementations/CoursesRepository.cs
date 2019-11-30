using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories.Implementations
{
    public class CoursesRepository : ICoursesRepository
    {
        public ApplicationDbContext context;

        public CoursesRepository(ApplicationDbContext context)
        {
            this.context = context;
        }
        public void Insert(Course item)
        {
            context.Add(item);
            context.SaveChanges();
           // context.Entry(item).State = EntityState.Added;
        }

        public void Update(Course item)
        { 
            context.Entry(item).State = EntityState.Modified;
        }
        public void Delete(Course item)
        { 
             context.Entry(item).State = EntityState.Deleted;
        }
        public IQueryable<Course> Queryable()
            => context.Set<Course>();
        
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


    }
}
