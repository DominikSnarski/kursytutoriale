using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Assigment
{
    public class AssignmentRequest
    {
        [Required]
        public Guid LessonId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
