using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class LessonPart
    {
        public LessonPart(string type, string content)
        {
            Type = type;
            Content = content;
        }

        public int Index { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
    }
}
