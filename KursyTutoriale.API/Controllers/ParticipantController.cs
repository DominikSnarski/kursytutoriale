using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    public class ParticipantController : Controller
    {
        private IParticipantService participantService;

        public ParticipantController(IParticipantService observerService)
        {
            this.participantService = observerService;
        }

        [HttpPost("AddParticipant")]
        public async Task AddParticipant(Guid courseId)
        {
            await participantService.AddParticipant(courseId);
        }

        [HttpDelete("RemoveParticipant")]
        public async Task RemoveParticipant(Guid courseId)
        {
            await participantService.RemoveParticipant(courseId);
        }


        [Authorize]
        [HttpGet("IsParticipating")]
        public bool IsParticipating(Guid courseId)
        {
            var result = participantService.IsParticipating(courseId);
            return result;
        }
    }
}
