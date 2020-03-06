using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Infrastructure.EventSourcing
{
    public class JsonEvent
    {
        public JsonEvent()
        {

        }

        public JsonEvent(
            Guid id,
            DateTime occuranceDate,
            string data,
            string eventType,
            Guid entityId)
        {
            Id = id;
            OccuranceDate = occuranceDate;
            Data = data;
            Type = eventType;
            EntityId = entityId;
        }

        public Guid Id { get; private set; }
        public DateTime OccuranceDate { get; private set; }
        public string Data { get; private set; }
        public string Type { get; private set; }
        public Guid EntityId { get; private set; }
    }
}
