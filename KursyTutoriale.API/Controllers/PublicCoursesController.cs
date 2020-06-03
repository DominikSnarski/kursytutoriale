using KursyTutoriale.API.Models.Publication;
using KursyTutoriale.API.Responses;
using KursyTutoriale.Application.DataTransferObjects.Course.Publication;
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

        public PublicCoursesController(
            IPublicationService publicationService
            )
        {
            this.publicationService = publicationService;
        }

        [Authorize]
        [HttpPost("Publish")]
        public IActionResult PublishCourse(Guid Id)
        {
            publicationService.PublishCourse(Id);

            return Ok();
        }

        [Authorize]
        [HttpPost("PublishSchedule")]
        public IActionResult PublishCourse([FromBody] PublicationScheduleRequestDTO request)
        {
            publicationService.SchedulePublication(request.DateOfPublication,request.CourseId);

            return Ok();
        }

        [Authorize]
        [HttpPost("PublishNewVersion")]
        public IActionResult PublishNewCourseVersion(Guid Id)
        {
            publicationService.PublishNewVersion(Id, true);

            return Ok();
        }

        [Authorize]
        [HttpPost("AddPromotionCode")]
        public IActionResult AddPromotionCode([FromQuery]Guid Id, [FromBody] DiscountConfigDto config)
        {
            publicationService.AddPromotionCode(Id, config);

            return Ok();
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
        public IActionResult InvalidateCode([FromQuery]Guid Id, [FromBody] CodeDto code)
        {
            publicationService.InvalidateCode(Id, code.Code);

            return Ok();
        }

        [Authorize]
        [HttpPost("AddLessonToPreview")]
        public IActionResult AddLessonToPreview([FromQuery]Guid courseId, [FromBody] LessonPreviewRequest request)
        {
            publicationService.AddLessonToPreview(courseId, request.LessonId);

            return Ok();
        }

        [Authorize]
        [HttpDelete("RemoveLessonFromPreview")]
        public IActionResult RemoveLessonFromPreview([FromQuery]Guid courseId, [FromBody] LessonPreviewRequest request)
        {
            publicationService.RemoveLessonFromPreview(courseId, request.LessonId);

            return Ok();
        }
    }
}
