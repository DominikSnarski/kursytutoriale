using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Auth
{
    public class ChangePasswordRequest
    {
        [Display(Name = "Token")]
        [MinLength(32, ErrorMessage = "Token is too short! (36 characters minimum)")]
        [Required(ErrorMessage = "Token is required!")]
        public string Token { get; set; }

        [Display(Name = "Password")]
        [MinLength(3, ErrorMessage = "Password is too short! (5 characters minimum)")]
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }


    }
}
