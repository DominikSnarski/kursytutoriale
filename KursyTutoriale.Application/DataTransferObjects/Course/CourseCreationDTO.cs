using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseCreationDTO
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        [StringLength(1000)]
        public string Description { get; set; }
        [Required]
        public float Price { get; set; }
        public ICollection<TagCreationDTO> Tags { get; set; }

    }
}
