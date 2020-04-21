using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class Participant
    {
        public Participant(Guid userId)
        {
            UserId = userId;
        }
        private Participant()
        {

        }

        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
    }
}