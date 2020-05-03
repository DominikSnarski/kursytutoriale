using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Comments
{
    public class AddCommentModel
    {
        [Required]
        [StringLength(100)]
        public string Content { get; set; }
    }
}
