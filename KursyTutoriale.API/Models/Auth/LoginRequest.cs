using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Auth
{
    public class LoginRequest
    {
        [Required]
        [MinLength(5)]
        public string Username { get; set; }

        [Required]
        [MinLength(5)]
        public string Password { get; set; }
    }
}
