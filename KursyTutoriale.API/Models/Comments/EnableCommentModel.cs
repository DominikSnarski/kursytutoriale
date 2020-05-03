using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Comments
{
    public class EnableCommentModel
    {
        [Required]
        public bool Enable { get; set; }

        [Required]
        public Guid CourseId { get; set; }
    }
}
