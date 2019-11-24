using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseModuleForEditionDTO
    {
        public int Index { get; set; }
        public string Title { get; set; }
        public ICollection<LessonBasicInformationsDTO> Lessons { get; set; }
    }
}
