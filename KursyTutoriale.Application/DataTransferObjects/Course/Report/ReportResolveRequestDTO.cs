using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Report
{
    public class ReportResolveRequestDTO
    {
        public Guid ReportId { get; set; }
        public string ResolverComment { get; set; }
        public ReportStatusType ReportStatus { get; set; }
    }
}
