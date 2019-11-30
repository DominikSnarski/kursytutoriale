using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class TagCreationDTO
    {
        public Guid CourseId { get; set; }
        public string TagName { get; set; }
        public int Id { get; set; }
    }
}
