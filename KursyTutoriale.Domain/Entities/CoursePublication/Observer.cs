using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class Observer
    {
        public Observer(Guid userId)
        {
            UserId = userId;
        }
        private Observer()
        {

        }

        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
    }
}