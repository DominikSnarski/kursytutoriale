using System;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class CourseVersion
    {
        public CourseVersion(int majorVersionNumber, int minorVersionNumber, DateTime publicationDate)
        {
            PublicationDate = publicationDate;
            MajorVersionNumber = majorVersionNumber;
            MinorVersionNumber = minorVersionNumber;
        }

        private CourseVersion()
        {

        }

        public int MajorVersionNumber { get; private set; }
        public int MinorVersionNumber { get; private set; }
        public DateTime PublicationDate { get; }

        public string GetVersionName() => $"{MajorVersionNumber}.{MinorVersionNumber}";
    }
}
