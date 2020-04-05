using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class LessonPartDTO
    {
        public LessonPartType Type { get; set; } 
        public string Name { get; set; }
        public object Content { get; set; }
        public int Index { get; set; }
    }
}
