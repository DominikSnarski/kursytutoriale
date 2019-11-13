using Microsoft.EntityFrameworkCore;
using URF.Core.EF;
using KursyTutoriale.Domain.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using URF.Core.Abstractions;
using System.Collections.Generic;
using KursyTutoriale.Domain;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;

namespace KursyTutoriale.Infrastructure.Repositories
{
    public class MockUpApplicationUserRepository :  IApplicationUserRepository
    {
        public MockUpApplicationUserRepository()
        {
            list = new List<ApplicationUser>();

            for(int i = 0; i < 100; i++)
            {
                list.Add(
                    new ApplicationUser()
                    {
                        UserName = i.ToString()
                    });
            }
        }
        public List<ApplicationUser> list;

        public void Insert(ApplicationUser item)
        {
            list.Add(item);
        }

        public void Delete(ApplicationUser item)
        {
            list.Remove(item);
        }

        public IQueryable<ApplicationUser> Queryable()
        {
            return list.AsQueryable();
        }

        public void InsertAgreggate(ApplicationUser aggregate)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> FindAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> FindAsync<TKey>(TKey keyValue, CancellationToken cancellationToken = default)
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

        public Task LoadPropertyAsync(ApplicationUser item, Expression<Func<ApplicationUser, object>> property, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public void Attach(ApplicationUser item)
        {
            throw new NotImplementedException();
        }

        public void Detach(ApplicationUser item)
        {
            throw new NotImplementedException();
        }

        public void Update(ApplicationUser item)
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

        public IQueryable<ApplicationUser> QueryableSql(string sql, params object[] parameters)
        {
            throw new NotImplementedException();
        }

        public IQuery<ApplicationUser> Query()
        {
            throw new NotImplementedException();
        }
    }
}
