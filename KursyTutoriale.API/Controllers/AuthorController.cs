using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {
        private ICourseAuthorService courseAuthorService;

        public AuthorController(ICourseAuthorService courseAuthorService)
        {
            this.courseAuthorService = courseAuthorService;
        }

        [HttpGet("MostPopularAuthors")]
        public List<UserProfileDTO> GetMostPopularAuthors([FromBody] int count)
        {
            return courseAuthorService.GetMostPopularAuthors(count);
        }
    }
}
