using System;

namespace KursyTutoriale.Application.DataTransferObjects.Assignment
{
    public class AssignmentDto
    {
        public string ReporterUsername { get; set; }
        public int? Rate { get; set; }
        public string Content { get; set; }
        public DateTime SentDate { get; set; }
    }
}
