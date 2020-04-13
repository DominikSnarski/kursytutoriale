using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.Services.CourseParticipants;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class CourseParticipantsController : Controller
    {
        private ICourseParticipantsService participationService;

        public CourseParticipantsController(ICourseParticipantsService participationService)
        {
            this.participationService = participationService;
        }

        [Authorize]
        [HttpPost("JoinCourse")]
        public async Task<bool> JoinCourse([FromBody]CourseParticipantDTO dto)
        {
            var result = await participationService.JoinCourse(dto);
            return result;
        }

        [Authorize]
        [HttpPost("LeaveCourse")]
        public async Task<bool> LeaveCourse([FromBody]CourseParticipantDTO dto)
        {
            var result = await participationService.LeaveCourse(dto);
            return result;
        }

        [Authorize]
        [HttpPost("IsParticipating")]
        public bool IsParticipating([FromBody]CourseParticipantDTO dto)
        {
            var result = participationService.IsParticipating(dto);
            return result;
        }
    }
}