using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Mod
{
    class ModeratorService : IModeratorService
    {
        private IExtendedRepository<Report> reportRepository;
        private IExtendedRepository<ApplicationUser> userRepository;
        private IExtendedRepository<Course> courseRepository;
        private IUnitOfWork unitOfWork;
        private IExecutionContextAccessor executionContext;
        private IDTOMapper mapper;

        public ModeratorService(IExtendedRepository<Report> reportRepository,
            IExtendedRepository<ApplicationUser> userRepository,
            IExtendedRepository<Course> courseRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContext,
            IDTOMapper mapper)
        {
            this.reportRepository = reportRepository;
            this.userRepository = userRepository;
            this.courseRepository = courseRepository;
            this.unitOfWork = unitOfWork;
            this.executionContext = executionContext;
            this.mapper = mapper;
        }

        public Guid BlockCourse(Guid courseId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ReportDTO> GetUnresolvedReports(int count)
        {
            var query = reportRepository.Queryable()
                .Where(r => r.ReportStatus == ReportStatusType.Unresolved)
                .OrderBy(r => r.ReportedDate);

            if (count > query.Count())
                count = query.Count();

            var result = mapper.Map<IEnumerable<ReportDTO>>(query.Take(count).AsEnumerable());

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
            var report = reportRepository.Queryable().First(r => r.Id == reportId);

            if (resolve == ReportStatusType.Unresolved)
                throw new ArgumentException("New status can't be 'unresolved' when resolving","resolve");
            if (report == null)
                throw new ArgumentException("reportId not found","reportId");
            if (executionContext.GetUserId() == null)
                throw new UnauthorizedAccessException();

            report.ResolvedDate = DateTime.Now;
            report.ReportStatus = resolve;
            report.ResolverId = (Guid)executionContext.GetUserId();
            report.ResolverComment = resolverComment;

            reportRepository.Update(report);
            var result = await unitOfWork.SaveChangesAsync();
        }
        
        /// <summary>
         /// Verifies the course
         /// </summary>
         /// <param name="CourseId">Id of the course in question</param>
         /// <returns>Created Verification Stamp</returns>
        public async Task<VerificationStamp> AcceptCourse(Guid CourseId)
        {
            var query = courseRepository.Queryable();
            var course = query.Where(c => c.Id.Equals(CourseId)).FirstOrDefault();

            var stamp = new VerificationStamp()
            {
                Index = course.VerificationStamps.Count + 1,
                Status = StampStatus.verified,
                Date = DateTime.UtcNow,
                CourseId = course.Id
            };

            course.VerificationStamps.Add(stamp);
            courseRepository.Update(course);
            var result = await unitOfWork.SaveChangesAsync();
            return stamp;
        }
        /// <summary>
        /// Rejects verification of the course
        /// </summary>
        /// <param name="CourseId">Id of the course in question</param>
        /// <param name="Dto">Object containing notes about rejection</param>
        /// <returns>Created Verification Stamp</returns>
        public async Task<VerificationStamp> RejectCourse(Guid CourseId, RejectionDTO Dto)
        {
            var query = courseRepository.Queryable();
            var course = query.Where(c => c.Id.Equals(CourseId)).FirstOrDefault();

            var stamp = new VerificationStamp()
            {
                Index = course.VerificationStamps.Count + 1,
                Status = StampStatus.rejected,
                Date = DateTime.UtcNow,
                CourseId = course.Id,
                Note = Dto.Note
            };

            course.VerificationStamps.Add(stamp);
            courseRepository.Update(course);
            var result = await unitOfWork.SaveChangesAsync();
            return stamp;
        }
        /// <summary>
        /// Returns the list of courses that are waiting to be verified, ordered from the oldest
        /// </summary>
        /// <param name="NrOfCourses">number of courses returned</param>
        /// <returns>List of courses waiting for verification</returns>
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            List<CourseBasicInformationsDTO> result = new List<CourseBasicInformationsDTO>();
            foreach (Course course in
                courseRepository.Queryable()
                .Where(c => c.VerificationStamps
                    .OrderByDescending(s => s.Index)
                    .First().Status == StampStatus.pending)
                .OrderBy(s => s.VerificationStamps
                    .OrderByDescending(s => s.Index)
                    .First().Date)
                .Take(NrOfCourses))
            {
                result.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            return result;
        }
    }
}
