using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseModuleBasicInformationsDTO
    {
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<LessonDetailsDTO> Lessons { get; set; }
    }
}
