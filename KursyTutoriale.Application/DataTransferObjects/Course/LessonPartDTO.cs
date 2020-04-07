using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class LessonPartDTO
    {
        public string Type { get; set; }
        public object Content { get; set; }
        public int Index { get; set; }
    }
}
