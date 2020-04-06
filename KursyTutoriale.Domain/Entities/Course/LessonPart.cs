using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class LessonPart
    {
        public LessonPart(string name, string content)
        {
            Name = name;
            Content = content;
        }

        public int Idex { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
    }
}
