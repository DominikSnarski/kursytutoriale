using Microsoft.EntityFrameworkCore;
using URF.Core.EF;
using KursyTutoriale.Domain.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using URF.Core.Abstractions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace KursyTutoriale.Infrastructure.Repositories
{
    interface IApplicationUserRepository : IExtendedRepository<ApplicationUser>
    {
        ApplicationUser Find(Predicate<ApplicationUser> predicate);
    }
    class ApplicationUserRepository :  ExtendedRepository<ApplicationUser>, IApplicationUserRepository
    {
        public ApplicationUserRepository() : base(null)
        {
            list = new List<ApplicationUser>();
        }

        public List<ApplicationUser> list;

        public override void Insert(ApplicationUser item)
        {
            list.Add(item);
        }

        public override void Delete(ApplicationUser item)
        {
            list.Remove(item);
        }

        public override IQueryable<ApplicationUser> Queryable()
        {
            return list.AsQueryable();
        }

        public ApplicationUser Find(Predicate<ApplicationUser> predicate)
        {
            return list.Find(predicate);
        }
    }
}
