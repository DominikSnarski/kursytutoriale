using KursyTutoriale.API.Models.Assigment;
using KursyTutoriale.Application.DataTransferObjects.Assignment;
using KursyTutoriale.Application.Services.Admin;
using KursyTutoriale.Application.Services.Assignments;
using KursyTutoriale.Domain.Entities.Administration;
using KursyTutoriale.Domain.Entities.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AssignmentController : Controller
    {
        private IAssignmentService assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            this.assignmentService = assignmentService;
        }

        [HttpPost("SendAssignment")]
        public IActionResult SendAssigment([FromBody] AssignmentRequest request)
        {
            assignmentService.SendAssignment(request.LessonId, request.Content);

            return Ok();
        }

        [HttpPost("RateAssignment")]
        public IActionResult RateAssigment([FromBody] RateAssigmentRequest request)
        {
            assignmentService.RateAssignemt(request.AssignmetId, request.Rate);

            return Ok();
        }

        [HttpGet("GetLessonAssignment")]
        public List<AssignmentDto> GetLessonAssignment([FromQuery] Guid lessonId)
        {
            return assignmentService.GetLessonAssigments(lessonId);
        }
    }
}
