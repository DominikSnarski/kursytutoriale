using System;

namespace KursyTutoriale.API.Models.Comments
{
    public class AddCommentModel
    {
        public string Content { get; set; }
        public Guid CourseId { get; set; }
    }
}
