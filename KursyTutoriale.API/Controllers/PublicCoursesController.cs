using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class PublicCoursesController : Controller
    {
        private IPublicationService publicationService;

        public PublicCoursesController(IPublicationService publicationService)
        {
            this.publicationService = publicationService;
        }

        [Authorize]
        [HttpPost("Publish")]
        public async Task PublishCourse(Guid Id)
        {
            await publicationService.PublishCourse(Id);
        }

        [Authorize]
        [HttpPost("PublishNewVersion")]
        public async Task PublishNewCourseVersion(Guid Id)
        {
            await publicationService.PublishNewVersion(Id, true);
        }
    }
}
