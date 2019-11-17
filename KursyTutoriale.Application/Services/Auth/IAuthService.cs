﻿using KursyTutoriale.Application.DataTransferObjects.Auth;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Auth
{
    public interface IAuthService
    {
        Task<JWTTokenDto> GenerateTokenAsync(string username);
        Task<JWTTokenDto> RefreshTokenAsync(string username, string refreshToken);
    }
}
