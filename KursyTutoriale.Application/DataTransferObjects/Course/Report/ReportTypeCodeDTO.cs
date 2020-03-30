using KursyTutoriale.Shared;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Report
{
    public class ReportTypeCodeDTO
    {
        public ReportTypeCodeDTO(ReportType code, string value)
        {
            this.code = code;
            this.value = value;
        }
        public ReportType code { get; set; }
        public string value { get; set; }
    }
}
