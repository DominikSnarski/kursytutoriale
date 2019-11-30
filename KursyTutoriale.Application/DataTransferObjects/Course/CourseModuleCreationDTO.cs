using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseModuleCreationDTO
    {
        public Guid CourseId { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
    }
}
