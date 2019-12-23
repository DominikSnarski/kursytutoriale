using Autofac.Extensions.DependencyInjection;
using KursyTutoriale.API.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;

namespace KursyTutoriale.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger(); 
            
            try
            {
                logger.Debug("init main");
                var webHost = CreateWebHostBuilder(args).Build();

                using(var lifetimeScope = webHost.Services.CreateScope())
                {
                    var serviceProvider = lifetimeScope.ServiceProvider;

                    try
                    {
                        IdentityStartup.CreateRoles(serviceProvider).Wait();
                        IdentityStartup.CreatePowerUsers(serviceProvider).Wait();
                    }
                    catch(Exception e)
                    {
                        logger.Error(e, "An error occured while initializing Identity authentication");
                    }
                }

                webHost.Run();

            }
            catch (Exception exception)
            {
                //NLog: catch setup errors
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Information);
                })
                .UseNLog();
    }
    
}
