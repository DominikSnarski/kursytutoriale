using KursyTutoriale.Application.Configuration.Options;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.Auth
{
    class AuthService : IAuthService
    {
        private UserManager<ApplicationUser> userManager;
        private JWTOptions jwtOptions;
        private IExtendedRepository<UserSignInDate> userSignInDateRepository;
        private IUnitOfWork unitOfWork;

        private const string REFRESH_TOKEN_KEY = "RefreshToken";
        private const string REFRESH_TOKEN_PROVIDER = "Default";

        public AuthService(UserManager<ApplicationUser> userManager,
            IOptions<JWTOptions> options,
            IExtendedRepository<UserSignInDate> userSignInDateRepository,
            IUnitOfWork unitOfWork)
        {
            jwtOptions = options.Value;
            this.userManager = userManager;
            this.userSignInDateRepository = userSignInDateRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<JWTTokenDto> GenerateTokenAsync(string username, string password)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user is null || !await userManager.CheckPasswordAsync(user, password))
                throw new AuthenticationException("Invalid username or password");

            var refreshToken = await userManager.GetAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);

            if (refreshToken == null)
            {
                await userManager.RemoveAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);
                refreshToken = await userManager.GenerateUserTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);

                await userManager.SetAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY, refreshToken);
            }

            var accessToken = await GenerateAccessToken(user);

            userSignInDateRepository.Insert(new UserSignInDate() { UserId=user.Id,Date=DateTime.Now});

            await unitOfWork.SaveChangesAsync();

            return new JWTTokenDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
                RefreshToken = refreshToken
            };
        }

        public async Task<JWTTokenDto> RefreshTokenAsync(string username, string refreshToken)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user == null)
                throw new AuthenticationException("User doesnt exist");

            var isTokenValid = await userManager.VerifyUserTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY, refreshToken);

            if (isTokenValid)
            {
                await userManager.RemoveAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);
                refreshToken = await userManager.GenerateUserTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);
                await userManager.SetAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY, refreshToken);

                var accessToken = await GenerateAccessToken(user);

                return new JWTTokenDto
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
                    RefreshToken = refreshToken
                };
            }

            throw new AuthenticationException("Refresh token failed");
        }

        private async Task<JwtSecurityToken> GenerateAccessToken(ApplicationUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>() {
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
                claims.Add(new Claim("roles", role));

            return new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwtOptions.ExpireTimeInMinutes),
                notBefore: DateTime.UtcNow,
                audience: jwtOptions.Audience,
                signingCredentials: creds);
        }
    }
}
