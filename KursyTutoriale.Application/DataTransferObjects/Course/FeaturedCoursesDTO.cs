using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class FeaturedCoursesDTO
    {
        public IEnumerable<CourseBasicInformationsDTO> NewPopular { get; set; }
        public IEnumerable<CourseBasicInformationsDTO> RecentlyUpdated { get; set; }
        public IEnumerable<CourseBasicInformationsDTO> NowPopular { get; set; }
        public IEnumerable<CourseBasicInformationsDTO> Discover { get; set; }
    }
}
