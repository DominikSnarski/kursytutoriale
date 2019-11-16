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
            services.AddControllersWithViews();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KursyTutorialeAPI", Version = "v1" });
            });
            services = ConfigureCORS(services);

            services.AddSpaStaticFiles(configuration =>
            {

            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            #region identity
            builder.RegisterType<MockUpUserProfileRepository>().As<IUserProfileRepository>();
            builder.RegisterType<MockUpApplicationUserRepository>().As<IApplicationUserRepository>();
            builder.RegisterType<AccountManagerService>().As<IAccountManagerService>();
            #endregion
            builder.RegisterType<MockupCoursesRepository>().As<ICoursesRepository>().SingleInstance();
            builder.RegisterType<CourseService>().As<ICourseService>();

            builder.RegisterModule(new DataAccessModule(Configuration.GetConnectionString("default")));
        }

        private IServiceCollection ConfigureCORS(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                    EnabledOriginsPolicy,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
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

            app.UseSwagger(); 
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "KursyTutorialeAPI V1");
            });


            app.UseCors(EnabledOriginsPolicy);
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
