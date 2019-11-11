using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Domain.Entites;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesViewerController : ControllerBase
    {

        ICoursesRepository courseRepository;
        public CoursesViewerController(ICoursesRepository courseRepository)
        {
            this.courseRepository = courseRepository;
        }
        // GET: api/<controller>
        [HttpGet("GetCourseDetails")]
        public Course GetCourseDetails(string id)
        {
            var query = courseRepository.Queryable();
            query = query.Where(q => q.Id.Equals(id));
            if (query != null)
            {
                return query.FirstOrDefault();
            }
            else return null;
        }

        [HttpGet("GetPageOfCourses")]
        public List<Course> GetPageOfCourses(int pageNumber)
        {
            var query = courseRepository.Queryable();
            query = query.Skip(pageNumber*4).Take(4);
            return query.ToList();

        }

        [HttpGet("GetPagesOfCourses")]
        public List<Course> GetPagesOfCourses(int firstPageNumber, int lastPageNumber)
        {
            var query = courseRepository.Queryable();
            query = query.Skip(firstPageNumber * 4).Take(4*(lastPageNumber-firstPageNumber+1));
            return query.ToList();
        }

    }
}