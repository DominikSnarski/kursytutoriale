using KursyTutoriale.Application.Configuration.Options;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Utils
{
    public class IdentityStartup
    {
        public static IServiceCollection ConfigureAuthentication(IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            IdentityModelEventSource.ShowPII = true;

            services.Configure<IdentityOptions>(op =>
            {
                op.Password.RequireDigit = false;
                op.Password.RequiredLength = 5;
                op.Password.RequireLowercase = true;
                op.Password.RequireUppercase = false;
                op.Password.RequireNonAlphanumeric = false;

                op.User.RequireUniqueEmail = false;
            });

            var jwtConfig = configuration.GetSection("JwtConfiguration");
            services.Configure<JWTOptions>(opt =>
            {
                opt.Issuer = jwtConfig["issuer"];
                opt.Audience = jwtConfig["audience"];
                opt.Secret = jwtConfig["secret"];
            });

            var key = Encoding.UTF8.GetBytes(jwtConfig["secret"]);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.ClaimsIssuer = "KursyTutoriale";
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtConfig["issuer"],
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                };
                x.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
                options.AddPolicy("PowerUser", policy => policy.RequireRole("Admin", "Moderator"));
            });

            return services;
        }

        public static async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
            IdentityResult result;

            string[] roleNames = { "Admin", "Moderator", "User" };

            foreach (var roleName in roleNames)
            {
                if(!await roleManager.RoleExistsAsync(roleName))
                {
                    result = await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));

                    if (!result.Succeeded)
                        throw new Exception($"Cannot create role: {roleName}");
                }
            }
        }

        public static async Task CreatePowerUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            var adminSection = configuration.GetSection("Admin");

            var currentAdmin = await userManager.FindByEmailAsync(adminSection["Email"]);

            if (currentAdmin != null)
                return;

            var powerUser = new ApplicationUser
            {
                UserName = adminSection["Username"],
                Email = adminSection["Email"]
            };
            
            string adminPassword = adminSection["Password"];

            var createPowerUser = await userManager.CreateAsync(powerUser, adminPassword);
            if (createPowerUser.Succeeded)
            {
                await userManager.AddToRoleAsync(powerUser, "Admin");
            }
        }
    }
}
