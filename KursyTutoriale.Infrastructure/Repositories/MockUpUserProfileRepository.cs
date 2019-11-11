using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using KursyTutoriale.Domain.Entities;
using URF.Core.Abstractions;

namespace KursyTutoriale.Infrastructure.Repositories
{
    public interface IUserProfileRepository : IExtendedRepository<UserProfile>
    {
    }
    public class MockUpUserProfileRepository : IUserProfileRepository
    {
        public MockUpUserProfileRepository()
        {
            list = new List<UserProfile>();

            for (int i = 0; i < 100; i++)
            {
                list.Add(
                    new UserProfile()
                    {
                        Name = i.ToString(),
                        Surname = i.ToString(),
                        Description = i.ToString()
                    });
            }
        }

        private List<UserProfile> list;

        public void Insert(UserProfile item)
        {
            list.Add(item);
        }

        public IQueryable<UserProfile> Queryable()
        {
            return list.AsQueryable<UserProfile>();
        }
        public void Delete(UserProfile item)
        {
            list.Remove(item);
        }

        public void Attach(UserProfile item)
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

        public void Detach(UserProfile item)
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

        public Task<UserProfile> FindAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<UserProfile> FindAsync<TKey>(TKey keyValue, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
        public void InsertAgreggate(UserProfile aggregate)
        {
            throw new NotImplementedException();
        }

        public Task LoadPropertyAsync(UserProfile item, Expression<Func<UserProfile, object>> property, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public IQuery<UserProfile> Query()
        {
            throw new NotImplementedException();
        }


        public IQueryable<UserProfile> QueryableSql(string sql, params object[] parameters)
        {
            throw new NotImplementedException();
        }

        public void Update(UserProfile item)
        {
            throw new NotImplementedException();
        }
    }
}
