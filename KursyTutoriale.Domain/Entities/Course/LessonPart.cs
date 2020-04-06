using KursyTutoriale.Shared;
using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class LessonPart
    {
        public LessonPart(string name, object content)
        {
            Name = name;
            Content = content;
            Type = LessonPartType.Paragraph;
        }
        public LessonPartType Type { get; set; } 
        public int Index { get; set; }
        public string Name { get; set; }
        public object Content { get; set; }
    }
}
