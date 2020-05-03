using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Publication
{
    public class FeaturedCoursesRequest
    {
        [Range(0,1000)]
        public int CategoryCount { get; set; }
    }
}
