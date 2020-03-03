using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.Application.DataTransferObjects.Auth
{
    public class CreateUserRequestDto
    {
        [Display(Name = "Login")]
        [Required(ErrorMessage = "Username is required!")]
        [MinLength(5, ErrorMessage = "Username is too short! (5 characters minimum)")]
        public string Username { get; set; }

        [Display(Name = "Password")]
        [MinLength(3, ErrorMessage = "Password is too short! (5 characters minimum)")]
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email is required!")]
        public string Email { get; set; }
    }
}
