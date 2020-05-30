using System;

namespace KursyTutoriale.Domain.Entities.Course
{
    class UserAnswer
    {
        public Guid UserId { get; set; }
        public Guid QuestionId { get; set; }
        public int Answer { get; set; }
    }
}
