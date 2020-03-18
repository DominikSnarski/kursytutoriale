using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Report : BaseEntity
    {
        public Report(Guid ReporterId, Guid CourseId)
        {
            this.CourseId = CourseId;
            this.ReporterId = ReporterId;
            ReportStatus = ReportStatusType.Unresolved;
            ReportType = ReportType.Other;    //Default Type
            ReportedDate = DateTime.Now;
        }

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
