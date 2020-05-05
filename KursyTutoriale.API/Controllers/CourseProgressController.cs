using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class CourseProgressController : ControllerBase
    {
        private ICourseProgressService progressService;

        public CourseProgressController(ICourseProgressService progressService)
        {
            this.progressService = progressService;
        }

        [Authorize]
        [HttpPost("MarkProgress")]
        public async Task MarkProgress([FromBody]CourseProgressDTO dto)
        {
            await progressService.MarkProgress(dto);
        }

        [HttpGet("GetUserCompletedCourses")]
        public IEnumerable<CourseBasicInformationsDTO> GetUserCompletedCourses(Guid userId)
        {
            var result = progressService.GetUserCompletedCourses(userId);
            return result;
        }

        [HttpGet("GetUserUncompletedCourses")]
        public IEnumerable<CourseBasicInformationsDTO> GetUserUncompletedCourses(Guid userId)
        {
            var result = progressService.GetUserUncompletedCourses(userId);
            return result;
        }


    }
}