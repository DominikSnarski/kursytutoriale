using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Domain.Entites;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class CourseCreatorController : Controller
    {
        ICoursesRepository courseRepository;
        public CourseCreatorController(ICoursesRepository courseRepository)
        {
            this.courseRepository = courseRepository;
        }
        // GET: api/<controller>
        [HttpPost("AddCourse")]
        public void CreateCourse(Course course)
        {
            courseRepository.Insert(course);

        }

        [HttpGet("GetCourseForEdition")]
        public Course GetCourseForEdition()
        {
            return new Course();
        }
    }
}
