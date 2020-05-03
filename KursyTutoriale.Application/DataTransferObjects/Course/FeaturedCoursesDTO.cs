using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class FeaturedCoursesDTO
    {
        public IEnumerable<CoursePageItemDTO> MostPopular { get; set; }
        public IEnumerable<CoursePageItemDTO> TopRated { get; set; }
    }
}
