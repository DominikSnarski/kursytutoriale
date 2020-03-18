using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Mod
{
    public interface IModeratorService
    {
        Task<VerificationStamp> AcceptCourse(Guid CourseId);
        Task<VerificationStamp> RejectCourse(Guid CourseId, RejectionDTO Dto);
        IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses);
        IEnumerable<ReportDTO> GetUnresolvedReports(int count);
        void ResolveReport(Guid reportId, ReportStatusType resolve, string resolverComment);
        Guid BlockCourse(Guid courseId);
        ReportDTO GetReport(Guid reportId);
    }
}
