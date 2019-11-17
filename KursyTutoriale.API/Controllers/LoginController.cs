using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.API.Models;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.Services.Auth;
using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IAccountManagerService accountManager;
        IAuthService authService;
        public LoginController(
            IAccountManagerService accountManager,
            IAuthService authService)
        {
            this.accountManager = accountManager;
            this.authService = authService;
        }

        [HttpPost("SignUp")]
        public async Task SignUp([FromBody]CreateUserRequestDto request)
        {
            var result = await accountManager.CreateAccount(request);
        }

        [HttpPost("SignIn")]
        public async Task<JWTTokenDto> SignIn(string username)
        {
            var token = await authService.GenerateTokenAsync(username);

            return token;
        }

        [HttpPost("RefreshToken")]
        public async Task<JWTTokenDto> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var token = await authService.RefreshTokenAsync(request.Username,request.RefreshToken);

            return token;
        }
    }
}