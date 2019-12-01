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
    public class CoursesRepository : ExtendedRepository<Course>, ICoursesRepository
    {
        public ApplicationDbContext context;

        public CoursesRepository(ApplicationDbContext context) : base (context)
        {
            this.context = context;
           
        }
    }
}
