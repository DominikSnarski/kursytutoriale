using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Application.Services.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        ICourseService courseService;
        ISystemService systemService;
        IReportService reportService;
        public ReportController(
            ICourseService courseService,
            ISystemService systemService,
            IReportService reportService)
        {
            this.courseService = courseService;
            this.systemService = systemService;
            this.reportService = reportService;
        }


        /// <summary>
        /// creates a new report regarding a specified course.
        /// </summary>
        /// <param name="report"></param>
        /// <returns>id of a created report</returns>
        [ProducesResponseType(200,Type = typeof(Guid))]
        [HttpPost("ReportCourse")]
        public async Task<IActionResult> ReportCourse([FromBody]ReportRequestDTO report)
        {
            Guid? id = null;
            try
            {
                id = await reportService.ReportCourse(report.CourseId, report.ReportType, report.ReporterComment);
            }
            catch(Exception e)
            {
                if (e is ArgumentException)
                    return NotFound();
                if (e is UnauthorizedAccessException)
                    return Unauthorized();
                throw;
            }
            if (id == null)
                return StatusCode(500);
            return Ok((Guid)id);
        }

        /// <summary>
        /// gets report codes and their respective meanings
        /// </summary>
        /// <returns>list of report codes with their values</returns>
        [HttpGet("GetReportTypeCodes")]
        public IEnumerable<ReportTypeCodeDTO> GetReportCodes()
        {
            return systemService.GetReportTypeCodes();
        }
    }
}