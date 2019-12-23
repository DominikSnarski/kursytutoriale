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
    [Authorize]
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
        /// Verifies the course
        /// </summary>
        /// <param name="CourseId">Id of the course in question</param>
        /// <returns>Index of the verified course</returns>
        [HttpPost("Verify")]
        public async Task<int> Accept(Guid CourseId)
        {
            var stamp = await courseService.Accept(CourseId);
            return stamp.Index;
        }
        /// <summary>
        /// Rejects the verification of the course
        /// </summary>
        /// <param name="request">Object containing the information about the rejection</param>
        /// <param name="CourseId">Id of the course in question</param>
        /// <returns>Index of the rejected course</returns>
        [HttpPost("Reject")]
        public async Task<int> Reject([FromBody]RejectionDTO request,Guid CourseId)
        {
            var stamp = await courseService.Reject(CourseId,request);
            return stamp.Index;
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