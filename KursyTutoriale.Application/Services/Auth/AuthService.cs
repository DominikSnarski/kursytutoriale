using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Domain.Entities.Auth;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Auth
{
    class AuthService : IAuthService
    {
        private UserManager<ApplicationUser> userManager;
        private const string REFRESH_TOKEN_KEY = "RefreshToken";
        private const string REFRESH_TOKEN_PROVIDER = "KursyTutoriale";

        public AuthService(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<JWTTokenDto> GenerateTokenAsync(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            var token = await userManager.GetAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);

            if (token == null)
            {
                await userManager.RemoveAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);
                token = await userManager.GenerateUserTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY);

                await userManager.SetAuthenticationTokenAsync(user, REFRESH_TOKEN_PROVIDER, REFRESH_TOKEN_KEY, token);
            }

            return new JWTTokenDto
            {
                Token = token
            };
        }
    }
}
