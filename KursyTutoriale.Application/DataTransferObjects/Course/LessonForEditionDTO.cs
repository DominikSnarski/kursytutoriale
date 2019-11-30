using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class LessonForEditionDTO
    {
        public int Index { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
<<<<<<< HEAD:KursyTutoriale.Application/DataTransferObjects/Course/LessonForEditionDTO.cs
=======
        public Guid AuthorId { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateOfLastEdit { get; set; }
        public int Rating { get; set; }
        public int Popularity { get; set; }
>>>>>>> Added Featured courses to course service:KursyTutoriale.Domain/Entities/Course.cs
    }
}
