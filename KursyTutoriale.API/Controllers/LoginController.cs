using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.API.Models;
using KursyTutoriale.API.Models.Auth;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.Services.Auth;
using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IAccountManagerService accountManager;
        IAuthService authService;
        private ILogger<LoginController> logger;
        public LoginController(
            IAccountManagerService accountManager,
            IAuthService authService, 
            ILogger<LoginController> logger)
        {
            this.accountManager = accountManager;
            this.authService = authService;
            this.logger = logger;
        }

        [HttpPost("SignUp")]
        public async Task SignUp([FromBody]CreateUserRequestDto request)
        {
            var result = await accountManager.CreateAccount(request);
        }

        [HttpPost("SignIn")]
        public async Task<JWTTokenDto> SignIn([FromBody] LoginRequest request)
        {
            var token = await authService.GenerateTokenAsync(request.Username,request.Password);
            logger.LogInformation($"User: {request.Username} signed in at {DateTime.UtcNow}");
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