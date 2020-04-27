using KursyTutoriale.API.Models.Publication;
using KursyTutoriale.API.Responses;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        [Authorize]
        [HttpPost("AddPromotionCode")]
        public async Task AddPromotionCode([FromQuery]Guid Id, [FromBody] DiscountConfigDto config)
        {
            await publicationService.AddPromotionCode(Id, config);
        }


        [Authorize]
        [HttpGet("GetDiscountCodes")]
        public List<DiscountCodeDto> AddPromotionCode(Guid Id)
        {
            return publicationService.GetCourseDiscountCodes(Id);
        }


        [Authorize]
        [HttpGet("GetPriceWithDiscount")]
        public GenericResponse<int> GetPriceWithDiscount([FromQuery]Guid Id, [FromBody] CodeDto code)
        {
            return new GenericResponse<int>(publicationService.GetPriceWithDiscountCode(Id, code.Code));
        }

        [Authorize]
        [HttpPut("InvalidateCode")]
        public async Task<IActionResult> InvalidateCode([FromQuery]Guid Id, [FromBody] CodeDto code)
        {
            await publicationService.InvalidateCode(Id, code.Code);

            return Ok();
        }
    }
}
