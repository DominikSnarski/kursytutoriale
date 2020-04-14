using System;

namespace KursyTutoriale.Application.Services.Utility
{
    public interface ITimeZoneService
    {
        public DateTime GetCurrentTimeUtc();
    }
}