using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Report
{
    public class ReportDTO
    {
        public Guid ReporterId { get; set; }
        public Guid CourseId { get; set; }
        public string ReporterComment { get; set; }
        public ReportType ReportType { get; set; }
        public DateTime ReportedDate { get; set; }
        public DateTime ResolvedDate { get; set; }
        public Guid ResolverId { get; set; }
        public string ResolverComment { get; set; }
        public ReportStatusType ReportStatus { get; set; }
    }
}
