using Autofac;
using KursyTutoriale.Infrastructure;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Infrastructure.Repositories.Mockups;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Infrastructure.Configuration;
using KursyTutoriale.Application.Configuration;
using KursyTutoriale.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using KursyTutoriale.Domain.Entities.Auth;
using System;
using System.Threading.Tasks;
using KursyTutoriale.Application.Configuration.DIModules;
using Microsoft.IdentityModel.Logging;
using System.Collections.Generic;
using Swashbuckle.AspNetCore.Swagger;
using KursyTutoriale.Application.Configuration.Options;
using KursyTutoriale.Infrastructure.Repositories.Implementations;
using URF.Core.Abstractions;

namespace KursyTutoriale.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public ILifetimeScope AutofacContainer { get; private set; }

        private readonly string EnabledOriginsPolicy = "enabledOriginsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services = ConfigureCORS(services);
            services = ConfigureAuthentication(services);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KursyTutorialeAPI", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                        },
                        new List<string>()
                    }
                });
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {

            #region identity
            builder.RegisterType<MockUpUserProfileRepository>().As<IUserProfileRepository>();
            builder.RegisterType<MockUpApplicationUserRepository>().As<IApplicationUserRepository>();
            builder.RegisterType<AccountManagerService>().As<IAccountManagerService>();
            #endregion
            builder.RegisterType<CoursesRepository>().As<ICoursesRepository>().SingleInstance();
            builder.RegisterType<CourseService>().As<ICourseService>();

            builder.RegisterModule(new DataAccessModule(Configuration.GetConnectionString("default")));

            builder.RegisterModule(new AutoMapperModule());
            builder.RegisterModule(new ServiceModule());
        }

        private IServiceCollection ConfigureAuthentication(IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, UserRole>()
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

            var jwtConfig = Configuration.GetSection("JwtConfiguration");
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
                options.AddPolicy("ApiUser", policy => policy.RequireClaim("Role", "ApiUser"));
            });

            return services;
        }
        private IServiceCollection ConfigureCORS(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                    EnabledOriginsPolicy,
                    builder =>
                    {
                        builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            return services;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors(EnabledOriginsPolicy);
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "KursyTutorialeAPI V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
