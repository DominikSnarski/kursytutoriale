using Autofac;
using KursyTutoriale.API.Utils;
using KursyTutoriale.Application.Configuration;
using KursyTutoriale.Application.Configuration.DIModules;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Application.Services.Admin;
using KursyTutoriale.Infrastructure.Configuration;
using KursyTutoriale.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;

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
            services.AddControllers()
                .AddNewtonsoftJson(opt =>
                {
                    opt.SerializerSettings.Error = (object sender, Newtonsoft.Json.Serialization.ErrorEventArgs args) =>
                    {
                        throw args.ErrorContext.Error;
                    };
                });

            services = ConfigureCORS(services);
            services = IdentityStartup.ConfigureAuthentication(services, Configuration);

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
            builder.RegisterType<CourseService>().As<ICourseService>();
            builder.RegisterType<SearchService>().As<ISearchService>();
            builder.RegisterType<FileService>().As<IFileService>();

            builder.RegisterModule(new DataAccessModule(Configuration.GetConnectionString("default")));

            builder.RegisterType<ExecutionContextAccessor>().AsImplementedInterfaces().SingleInstance();

            builder.RegisterModule(new AutoMapperModule());
            builder.RegisterModule(new ServiceModule());
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
