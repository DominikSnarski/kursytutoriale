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
        Task<int> AcceptCourse(Guid CourseId);
        Task<int> RejectCourse(Guid CourseId, RejectionDTO Dto);
        Task<IEnumerable<CourseBasicInformationsDTO>> GetAndAssignCoursesRequiringVerification(int NrOfCourses);
        IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses);
        IEnumerable<ReportDTO> GetUnresolvedReports(int count);
        Task<IEnumerable<ReportDTO>> AssignAndGetUnresolvedReports(int count);
        void ResolveReport(Guid reportId, ReportStatusType resolve, string resolverComment);
        Task<int> BlockCourse(Guid courseId,string note);
        ReportDTO GetReport(Guid reportId);
    }
}
