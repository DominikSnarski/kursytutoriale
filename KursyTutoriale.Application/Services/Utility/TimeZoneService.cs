using System;

namespace KursyTutoriale.Application.Services.Utility
{
    public class TimeZoneService : ITimeZoneService
    {
        public DateTime GetCurrentTimeUtc() => DateTime.UtcNow;
    }
}
