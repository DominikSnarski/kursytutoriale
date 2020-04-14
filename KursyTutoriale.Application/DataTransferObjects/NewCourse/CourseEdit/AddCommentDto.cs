using System;

namespace KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit
{
    public class AddCommentDto
    {
        public string Content { get; set; }
        public Guid CourseId { get; set; }
    }
}
