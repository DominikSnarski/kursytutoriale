using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Statistics;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Application.Services.Statistics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    
    [Route("api/[controller]")]
    public class SurveyController : Controller
    {
        private ISurveyService surveyService;

        public SurveyController(ISurveyService surveyService)
        {
            this.surveyService = surveyService;
        }

        [Authorize]
        [HttpGet("GetSurvey")]
        public SurveyDTO GetCreatedCoursesData([FromQuery] Guid courseId)
        {
            var result = surveyService.GetSurvey(courseId);

            return result;
        }

        [Authorize]
        [HttpPost("AddSurvey")]
        public void AddSurvey([FromQuery] Guid courseId)
        {
            surveyService.AddSurvey(courseId);
        }

        [Authorize]
        [HttpPut("UpdateSurvey")]
        public void UpdateSurvey([FromQuery] Guid courseId, [FromBody] SurveyDTO model)
        {
            surveyService.UpdateSurvey(courseId, model);
        }
    }
}