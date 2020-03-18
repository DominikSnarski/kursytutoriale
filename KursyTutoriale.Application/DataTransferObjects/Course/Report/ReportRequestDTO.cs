using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Report
{
    public class ReportRequestDTO
    {
        public Guid CourseId { get; set; }
        public string ReporterComment { get; set; }
        public ReportType ReportType { get; set; }
    }
}
