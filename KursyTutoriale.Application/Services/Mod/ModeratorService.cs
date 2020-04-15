using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Course.Events;
using KursyTutoriale.Domain.Entities.Moderation;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Mod
{
    class ModeratorService : IModeratorService
    {
        private IExtendedRepository<Report> reportRepository;
        private IExtendedRepository<ApplicationUser> userRepository;
        private ICourseRepository courseRepository;
        private IUnitOfWork unitOfWork;
        private IExecutionContextAccessor executionContext;
        private IDTOMapper mapper;
        private IExtendedRepository<ModAssignment> assignmentRepository;

        public ModeratorService(IExtendedRepository<Report> reportRepository,
            IExtendedRepository<ApplicationUser> userRepository,
            ICourseRepository courseRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContext,
            IDTOMapper mapper,
            IExtendedRepository<ModAssignment> assignmentRepository)
        {
            this.reportRepository = reportRepository;
            this.userRepository = userRepository;
            this.courseRepository = courseRepository;
            this.unitOfWork = unitOfWork;
            this.executionContext = executionContext;
            this.mapper = mapper;
            this.assignmentRepository = assignmentRepository;
        }

        public async Task<int> BlockCourse(Guid courseId,string note)
        {
            var course = courseRepository.Find(courseId);

            var userId = executionContext.GetUserId();
            var @event = new VerificationChanged(courseId, StampStatus.Blocked, note, userId);

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();

            return 0;
        }

        public IEnumerable<ReportDTO> GetUnresolvedReports(int count)
        {
            var query = reportRepository.Queryable()
                .Where(r => r.ReportStatus == ReportStatusType.Unresolved)
                .OrderBy(r => r.ReportedDate)
                .Take(count);

            var result = mapper.Map<IEnumerable<ReportDTO>>(query.AsEnumerable());

            return result;
        }
        public async Task<IEnumerable<ReportDTO>> AssignAndGetUnresolvedReports(int count)
        {
            //reset moderator's assignments
            foreach(Report r in reportRepository.Queryable()
                .Where(r => r.ModAssigneeId == executionContext.GetUserId()))
            {
                r.ModAssigneeId = Guid.Empty;
                r.DateOfModAssignment = DateTime.MinValue;
            }

            await unitOfWork.SaveChangesAsync();

            var query = reportRepository.Queryable()
                .Where(r => r.ReportStatus == ReportStatusType.Unresolved &&
                    DateTime.Compare(r.DateOfModAssignment.AddHours(1), DateTime.UtcNow) < 0)
                .OrderBy(r => r.ReportedDate)
                .Take(count);

            foreach (Report report in query)
            {
                report.ModAssigneeId = executionContext.GetUserId();
                report.DateOfModAssignment = DateTime.UtcNow;
            }

            var result = mapper.Map<IEnumerable<ReportDTO>>(query.AsEnumerable());

            await unitOfWork.SaveChangesAsync();

            return result;
        }
        public ReportDTO GetReport(Guid reportId)
        {
            var report = reportRepository.Queryable()
                .First(r => r.Id == reportId);

            if(report == null)
                throw new ArgumentException("reportId not found", "reportId");

            ReportDTO result = mapper.Map<ReportDTO>(report);

            return result;
        }


        /// <summary>
        /// Resolves a report
        /// </summary>
        /// <param name="reportId">id of a report</param>
        /// <param name="resolve">new status for the report</param>
        /// <param name="resolverComment">a comment left by a power user which resolved the report</param>
        /// <returns>Id of a report</returns>
        public async void ResolveReport(Guid reportId, ReportStatusType resolve, string resolverComment)
        {
            var report = await reportRepository.Queryable().FirstOrDefaultAsync(r => r.Id == reportId);

            if (report.ModAssigneeId != executionContext.GetUserId() &&
                !executionContext.GetUserRoles().Contains("Admin"))
                throw new UnauthorizedAccessException("Moderator not assigned to resolvement of this report");

            if (resolve == ReportStatusType.Unresolved)
                throw new ArgumentException("New status can't be 'unresolved' when resolving","resolve");
            if (report == null)
                throw new ArgumentException("reportId not found","reportId");

            if(resolve == ReportStatusType.CourseBlocked)
            {
                await BlockCourse(report.CourseId,resolverComment);
            }

            report.ResolvedDate = DateTime.UtcNow;
            report.ReportStatus = resolve;
            report.ResolverId = executionContext.GetUserId();
            report.ResolverComment = resolverComment;

            reportRepository.Update(report);
            var result = await unitOfWork.SaveChangesAsync();
        }
        
        /// <summary>
         /// Verifies the course
         /// </summary>
         /// <param name="CourseId">Id of the course in question</param>
         /// <returns>Created Verification Stamp</returns>
        public async Task<int> AcceptCourse(Guid CourseId)
        {
            var course = courseRepository.Find(CourseId);
            var assignments = assignmentRepository
                .Queryable()
                .Where(a => a.EntityId == CourseId && 
                    a.Type == ModAssignmentType.Verification).ToArray();
            var userId = executionContext.GetUserId();

            if (!assignments.Any(a => a.ModAssigneeId == userId)
                && !executionContext.GetUserRoles().Contains("Admin"))
            {
                throw new Exception("Moderator not assigned to the verification of this course");
            }

            var @event = new VerificationChanged(CourseId,StampStatus.Verified,null,userId);

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();

            return 0;
        }
        /// <summary>
        /// Rejects verification of the course
        /// </summary>
        /// <param name="CourseId">Id of the course in question</param>
        /// <param name="Dto">Object containing notes about rejection</param>
        /// <returns>Created Verification Stamp</returns>
        public async Task<int> RejectCourse(Guid CourseId, RejectionDTO Dto)
        {
            var assignments = assignmentRepository
                .Queryable()
                .Where(a => a.EntityId == CourseId &&
                    a.Type == ModAssignmentType.Verification);
            var userId = executionContext.GetUserId();

            if (!assignments.Any(a => a.ModAssigneeId == userId)
                && !executionContext.GetUserRoles().Contains("Admin"))
            {
                throw new Exception("Moderator not assigned to the verification of this course");
            }

            var course = courseRepository.Find(CourseId);

            var @event = new VerificationChanged(CourseId, StampStatus.Rejected, Dto.Note, userId);

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();

            return 0;
        }
        /// <summary>
        /// Returns the list of courses that are waiting to be verified, ordered from the oldest
        /// </summary>
        /// <param name="NrOfCourses">number of courses returned</param>
        /// <returns>List of courses waiting for verification</returns>
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            List<CourseBasicInformationsDTO> result = new List<CourseBasicInformationsDTO>();
            foreach (var course in
                courseRepository.Queryable()
                .Include(c => c.VerificationStamp)
                .Where(c => c.VerificationStamp.Status == StampStatus.Pending)
                .OrderBy(s => s.VerificationStamp.Date)
                .Take(NrOfCourses))
            {
                result.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }

            return result;
        }
        /// <summary>
        /// Returns the list of courses that are waiting to be verified, ordered from the oldest, assigns moderators to the verification of the course for 1 hour
        /// </summary>
        /// <param name="NrOfCourses">number of courses returned</param>
        /// <returns>List of courses waiting for verification</returns>
        public async Task<IEnumerable<CourseBasicInformationsDTO>> GetAndAssignCoursesRequiringVerification(int NrOfCourses)
        {
            var userid = executionContext.GetUserId();
            //reset moderator's assignments
            foreach (ModAssignment a in assignmentRepository.Queryable()
                .Where(a => a.ModAssigneeId == userid && a.Type == ModAssignmentType.Verification))
            {
                assignmentRepository.Delete(a);
            }

            await unitOfWork.SaveChangesAsync();

            List<CourseBasicInformationsDTO> result = new List<CourseBasicInformationsDTO>();
            foreach (var course in
                courseRepository.Queryable()
                .Include(c => c.VerificationStamp)
                .Where(c => c.VerificationStamp.Status == StampStatus.Pending &&
                    c.OwnerId != userid)
                .OrderBy(s => s.VerificationStamp.Date)
                .Take(NrOfCourses))
            {
                assignmentRepository.Insert(new ModAssignment()
                {
                    EntityId = course.Id,
                    Type = ModAssignmentType.Verification,
                    DateOfModAssignment = DateTime.UtcNow,
                    ModAssigneeId = userid
                });
                result.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            await unitOfWork.SaveChangesAsync();

            return result;
        }
    }
}
