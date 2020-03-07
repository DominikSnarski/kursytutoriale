using System;

namespace KursyTutoriale.Infrastructure.EventSourcing
{
    public class CourseJsonEvent : JsonEvent
    {
        public CourseJsonEvent(Guid lessonId,
            DateTime occuranceDate,
            string data,
            string eventType,
            Guid entityId) : base(lessonId, occuranceDate, data, eventType, entityId)
        {
            
        }
    }
}
