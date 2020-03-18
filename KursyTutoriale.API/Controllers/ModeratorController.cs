using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using System.Collections.Generic;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.Services.Mod;
using KursyTutoriale.Application.DataTransferObjects.Course.Report;

namespace KursyTutoriale.API.Controllers
{
    [Authorize (Policy = "PowerUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class ModeratorController : ControllerBase
    {
        private IModeratorService moderatorService;
        private ISystemService systemService;
        public ModeratorController(IModeratorService moderatorService,
            ISystemService systemService)
        {
            this.moderatorService = moderatorService;
            this.systemService = systemService;
        }
        /// <summary>
        /// Verifies the course
        /// </summary>
        /// <param name="CourseId">Id of the course in question</param>
        /// <returns>Index of the verified course</returns>
        [HttpPost("VerifyCourse")]
        public async Task<int> Accept(Guid CourseId)
        {
            var stamp = await moderatorService.AcceptCourse(CourseId);
            return stamp.Index;
        }
        /// <summary>
        /// Rejects the verification of the course
        /// </summary>
        /// <param name="request">Object containing the information about the rejection</param>
        /// <param name="CourseId">Id of the course in question</param>
        /// <returns>Index of the rejected course</returns>
        [HttpPost("RejectCourse")]
        public async Task<int> Reject([FromBody]RejectionDTO request,Guid CourseId)
        {
            var stamp = await moderatorService.RejectCourse(CourseId,request);
            return stamp.Index;
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [HttpGet("GetCoursesForVerification")]
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            return moderatorService.GetCoursesForVerification(NrOfCourses);
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [HttpGet("GetUnresolvedReports")]
        public IEnumerable<ReportDTO> GetUnresolvedReports(int count)
        {
            return moderatorService.GetUnresolvedReports(count);
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [HttpGet("GetReport")]
        public ReportDTO GetReport(Guid reportId)
        {
            return moderatorService.GetReport(reportId);
        }

        /// <summary>
        /// gets report status codes and their respective meanings
        /// </summary>
        /// <returns>list of report status codes with their values</returns>
        [HttpGet("GetReportStatusCodes")]
        public IEnumerable<ReportStatusCodeDTO> GetReportStatusCodes()
        {
            return systemService.GetReportStatusCodes();
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [HttpPut("ResolveReport")]
        public IActionResult ResolveReport([FromBody]ReportResolveRequestDTO resolveRequest)
        {
            try
            {
                moderatorService.ResolveReport(resolveRequest.ReportId,
                    resolveRequest.ReportStatus,
                    resolveRequest.ResolverComment);    
            }
            catch(Exception e)
            {
                if (e is ArgumentException)
                {
                    if (e.Source == "resolve")
                        return BadRequest();
                    if (e.Source == "reportId")
                        return NotFound();
                }
                if (e is UnauthorizedAccessException)
                    return Unauthorized();
            }
            return Ok();
        }
    }
}