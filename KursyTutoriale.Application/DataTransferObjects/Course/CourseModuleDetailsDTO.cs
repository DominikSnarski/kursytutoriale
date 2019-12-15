using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseModuleDetailsDTO
    {
        public int Index { get; set; }
        public string Title { get; set; }
        public string Description{ get; set; }
        public string Image { get; set; }
        public ICollection<LessonBasicInformationsDTO> Lessons { get; set; }
    }
}
