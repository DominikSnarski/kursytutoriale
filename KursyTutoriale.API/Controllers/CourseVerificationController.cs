using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using System.Collections.Generic;
using KursyTutoriale.Application.DataTransferObjects.Course;

namespace KursyTutoriale.API.Controllers
{
    [Authorize (Policy = "PowerUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseVerificationController : ControllerBase
    {
        ICourseService courseService;
        public CourseVerificationController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [HttpGet("GetCoursesForVerification")]
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            return courseService.GetCoursesForVerification(NrOfCourses);
        }
    }
}