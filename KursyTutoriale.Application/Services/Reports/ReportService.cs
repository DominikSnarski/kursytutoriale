using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using System;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Reports
{
    class ReportService : IReportService
    {
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<Report> reportRepository;
        private ICourseRepository courseRepository;
        private IUnitOfWork unitOfWork;

        public ReportService(
            IExecutionContextAccessor executionContext,
            IExtendedRepository<Report> reportRepository,
            IUnitOfWork unitOfWork,
            ICourseRepository courseRepository)
        {
            this.executionContext = executionContext;
            this.reportRepository = reportRepository;
            this.unitOfWork = unitOfWork;
            this.courseRepository = courseRepository;
        }

        /// <summary>
        /// Creates a report for a course, takes user report it from execution context
        /// </summary>
        /// <param name="courseId">the id of the course reported</param>
        /// <param name="reporterComment">the comment left with a report by a reporter</param>
        /// <param name="type">type of a report</param>
        /// <returns>Id of the report made</returns>

        public async Task<Guid> ReportCourse(Guid courseId, ReportType type, string reporterComment)
        {
            CourseReadModel course = courseRepository.Queryable().FirstOrDefault(c => c.Id == courseId);
            if (course == null)
            {
                throw new ArgumentException("courseId not found", "courseId");
            }
            if (executionContext.GetUserId() == null)
            {
                throw new UnauthorizedAccessException();
            }
            Report report = new Report(executionContext.GetUserId(), courseId);
            report.ReportType = type;
            report.ReporterComment = reporterComment;

            reportRepository.Insert(report);
            var result = await unitOfWork.SaveChangesAsync();
            return report.Id;
        }
    }
}
