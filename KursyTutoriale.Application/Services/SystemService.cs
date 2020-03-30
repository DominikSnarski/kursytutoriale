using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Shared;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services
{
    public interface ISystemService
    {
        IEnumerable<ReportTypeCodeDTO> GetReportTypeCodes();
        IEnumerable<ReportStatusCodeDTO> GetReportStatusCodes();
    }
    public class SystemService : ISystemService
    {
        public IEnumerable<ReportTypeCodeDTO> GetReportTypeCodes()
        {
            List<ReportTypeCodeDTO> codes = new List<ReportTypeCodeDTO>()
            {
                new ReportTypeCodeDTO(ReportType.VulgarContent,"Vulgar Content"),
                new ReportTypeCodeDTO(ReportType.HateSpeech,"Hate Speech"),
                new ReportTypeCodeDTO(ReportType.Other,"Other")
            };
            return codes.AsEnumerable();
        }
        public IEnumerable<ReportStatusCodeDTO> GetReportStatusCodes()
        {
            List<ReportStatusCodeDTO> codes = new List<ReportStatusCodeDTO>()
            {
                new ReportStatusCodeDTO(ReportStatusType.Resolved,"Resolved/Report Unjustified"),
                new ReportStatusCodeDTO(ReportStatusType.CourseBlocked,"Block Course")
            };
            return codes;
        }
    }
}
