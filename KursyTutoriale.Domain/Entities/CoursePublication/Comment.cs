using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class Comment
    {
        private Comment()
        {

        }

        public Comment(Guid userId, string content, DateTime insertDate)
        {
            UserId = userId;
            Content = content;
            InsertDate = insertDate;
        }

        public Guid Id { get; }
        public Guid UserId { get; private set; }
        public string Content { get; private set; }
        public DateTime InsertDate { get; private set; }
    }
}
