using KursyTutoriale.Shared;
using System;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Reports
{
    public interface IReportService
    {
        Task<Guid> ReportCourse(Guid courseId, ReportType type, string reporterComment);
    }
}