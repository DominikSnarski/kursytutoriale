using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Publication
{
    public class LessonPreviewRequest
    {
        [Required]
        public Guid LessonId { get; set; }
    }
}
