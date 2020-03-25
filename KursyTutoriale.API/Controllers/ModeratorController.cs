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
        [HttpPut("VerifyCourse")]
        public async Task<int> Accept(Guid CourseId)
        {
            return await moderatorService.AcceptCourse(CourseId);
        }
        /// <summary>
        /// Rejects the verification of the course
        /// </summary>
        /// <param name="request">Object containing the information about the rejection</param>
        /// <param name="CourseId">Id of the course in question</param>
        /// <returns>Index of the rejected course</returns>
        [HttpPut("RejectCourse")]
        public async Task<int> Reject([FromBody]RejectionDTO request,Guid CourseId)
        {
            return await moderatorService.RejectCourse(CourseId,request);
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [Authorize(Policy ="Admin")]
        [HttpGet("GetCoursesForVerification")]
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            return moderatorService.GetCoursesForVerification(NrOfCourses);
        }
        /// <summary>
        /// Fetches the courses that require verification, Ordered by the oldest
        /// </summary>
        /// <returns>The list of the courses that require verification</returns>
        [HttpGet("AssignCoursesRequiringVerification")]
        public Task<IEnumerable<CourseBasicInformationsDTO>> GetAndAssignCoursesRequiringVerification()
        {
            return moderatorService.GetAndAssignCoursesRequiringVerification(3);
        }
        /// <summary>
        /// Fetches reports ordered by the oldest
        /// </summary>
        /// <param name="NrOfCourses">Number of reports to be fetched</param>
        /// <returns>The list of reports</returns>
        [Authorize(Policy = "Admin")]
        [HttpGet("GetUnresolvedReports")]
        public IEnumerable<ReportDTO> GetUnresolvedReports(int count)
        {
            return moderatorService.GetUnresolvedReports(count);
        }
        /// <summary>
        /// Fetches reports ordered by the oldest, assigns them to moderator
        /// </summary>
        /// <returns>The list of reports</returns>
        [HttpGet("AssignReports")]
        public Task<IEnumerable<ReportDTO>> GetAndAssignReports()
        {
            return moderatorService.AssignAndGetUnresolvedReports(3);
        }
        /// <summary>
        /// Fetches the report 
        /// </summary>
        /// <param name="NrOfCourses">Number of courses to be fetched</param>
        /// <returns>The list of the courses that require verification</returns>
        [Authorize(Policy ="Admin")]
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