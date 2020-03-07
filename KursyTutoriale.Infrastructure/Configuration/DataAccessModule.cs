using Autofac;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using URF.Core.Abstractions;
using URF.Core.EF;

namespace KursyTutoriale.Infrastructure.Configuration
{
    public class DataAccessModule : Module
    {
        private string connectionString;

        public DataAccessModule(string connectionString)
        {
            this.connectionString = connectionString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterGeneric(typeof(ExtendedRepository<>)).As(typeof(IExtendedRepository<>)).InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();

            builder.Register<ApplicationDbContext>(ctx =>
            {
                var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
                var loggerFactory = ctx.Resolve<ILoggerFactory>();

                var options = builder
                    .UseSqlServer(connectionString)
                    .UseLoggerFactory(loggerFactory)
                    .Options;

                var context = new ApplicationDbContext(options);

                return context;
            })
            .AsSelf()
            .As<DbContext>() //For URF only
            .InstancePerLifetimeScope();
        }
    }
}
