using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Auth
{
    public class RefreshTokenRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string RefreshToken { get; set; }
    }
}
