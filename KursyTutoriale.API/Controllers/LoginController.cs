using KursyTutoriale.API.Models.Auth;
using KursyTutoriale.API.Responses;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.Services.Auth;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

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
        public async Task<GenericResponse> SignUp([FromBody]CreateUserRequestDto request)
        {
            var result = await accountManager.CreateAccount(request);

            if(!result.Succeeded)
                return new GenericResponse(400, result.Errors.Select(error => error.Description));

            return new GenericResponse(200);
        }

        [HttpPost("SignIn")]
        public async Task<DtoBasedRsponse<JWTTokenDto>> SignIn([FromBody] LoginRequest request)
        {
            JWTTokenDto token;

            try
            {
                 token = await authService.GenerateTokenAsync(request.Username, request.Password);
            }
            catch(AuthenticationException e)
            {
                return new DtoBasedRsponse<JWTTokenDto>(400, e.Message);
            }

            logger.LogInformation($"User: {request.Username} signed in at {DateTime.UtcNow}");

            return new DtoBasedRsponse<JWTTokenDto>(token);
        }

        [HttpPost("RefreshToken")]
        public async Task<DtoBasedRsponse<JWTTokenDto>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            JWTTokenDto token;

            try
            {
                token = await authService.RefreshTokenAsync(request.Username, request.RefreshToken);
            }
            catch(AuthenticationException)
            {
                return new DtoBasedRsponse<JWTTokenDto>(400, "Token refresh failed");
            }

            return new DtoBasedRsponse<JWTTokenDto>(token);
        }
    }
}