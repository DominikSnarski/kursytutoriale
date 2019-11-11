using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.Services;
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

        CourseService courseService;
        public CoursesViewerController(CourseService courseService)
        {
            this.courseService = courseService;
        }


        /// <summary>
        /// Used to get details of course.
        /// </summary>
        /// <param name="id"> Id of course you want to get </param>
        /// <returns>
        /// Returns details of course.
        /// </returns>
        [HttpGet("GetCourseDetails")]
        public Course GetCourseDetails(Guid courseId)
        {
            return courseService.GetCourseDetail(courseId);
        }

        /// <summary>
        /// Return pages of courses, as a list of courses.
        /// </summary>
        /// <param name="firstPageNumber"> Indicates with page is first in range</param>
        /// <param name="lastPageNumber"> Indicates with page is last in range</param>
        /// <param name="pageSize"> Indicates how many courses is on page</param>
        /// <returns>
        /// Returns pages from firstPageNumber to lastPageNumber.
        /// If for exemple firstPageNumber=1 and lastPageNumber=3, it will return courses from first page to third page.
        /// </returns>
        [HttpGet("GetPagesOfCourses")]
        public List<Course> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize)
        {
            return courseService.GetPagesOfCourses(firstPageNumber, lastPageNumber, pageSize);
        }

    }
}