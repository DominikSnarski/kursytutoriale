using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Report
{
    public class ReportStatusCodeDTO
    {
        public ReportStatusCodeDTO(ReportStatusType code, string value)
        {
            this.code = code;
            this.value = value;
        }
        public ReportStatusType code { get; set; }
        public string value { get; set; }
    }
}
