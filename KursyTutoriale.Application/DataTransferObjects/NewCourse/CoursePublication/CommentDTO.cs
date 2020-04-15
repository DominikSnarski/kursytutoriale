using System;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse.CoursePublication
{
    public class CommentDTO
    {
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime InsertDate { get; set; }
    }
}
