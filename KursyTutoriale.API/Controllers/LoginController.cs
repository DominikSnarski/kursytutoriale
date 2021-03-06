﻿using KursyTutoriale.API.Models.Auth;
using KursyTutoriale.API.Responses;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.Services.Auth;
using KursyTutoriale.Application.Services.Statistics;
using KursyTutoriale.Infrastructure;
using KursyTutoriale.Shared.Exceptions;
using Microsoft.AspNetCore.Authorization;
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
        private IStatisticsService statisticsService;
        private ILogger<LoginController> logger;
        public LoginController(
            IAccountManagerService accountManager,
            IAuthService authService, 
            ILogger<LoginController> logger,
            IStatisticsService statisticsService)
        {
            this.accountManager = accountManager;
            this.authService = authService;
            this.logger = logger;
            this.statisticsService = statisticsService;
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp([FromBody]CreateUserRequestDto request)
        {
            if (ModelState.IsValid)
            {
                var result = await accountManager.CreateAccount(request);

                if (!result.Succeeded)
                    throw new InvalidStateException(ResponseHelper.GetErrorMessage(result.Errors.Select(e => e.Description)));

                return Ok();
            }
            else
            {
                return null;
            }
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult<JWTTokenDto>> SignIn([FromBody] LoginRequest request)
        {
            JWTTokenDto token;

            token = await authService.GenerateTokenAsync(request.Username, request.Password);
            logger.LogInformation($"User: {request.Username} signed in at {DateTime.UtcNow}");

            return Ok(token);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult<JWTTokenDto>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            JWTTokenDto token;

            token = await authService.RefreshTokenAsync(request.Username, request.RefreshToken);

            return Ok(token);
        }

        [Authorize]
        [HttpPost("ConfirmEmail")]
        public async Task ConfirmEmail(string code)
        {
            await accountManager.ConfirmEmail(code);
        }

        [HttpPost("ForgotPassword")]
        public async Task ForgotPassword(String email)
        {
            await accountManager.ForgotPassword(email);
        }

        [HttpPost("ChangePassword")]
        public async Task ChangePassword(ChangePasswordRequest request)
        {
            await accountManager.ChangePassword(request);
        }
    }
}