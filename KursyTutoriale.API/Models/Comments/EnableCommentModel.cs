using System;

namespace KursyTutoriale.API.Models.Comments
{
    public class EnableCommentModel
    {
        public bool Enable { get; set; }
        public Guid CourseId { get; set; }
    }
}
