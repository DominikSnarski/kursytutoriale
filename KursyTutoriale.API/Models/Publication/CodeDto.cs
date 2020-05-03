using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Publication
{
    public class CodeDto
    {
        [Required]
        public string Code { get; set; }
    }
}
