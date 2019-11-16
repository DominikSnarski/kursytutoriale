using Autofac;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

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

            builder.Register<ApplicationDbContext>(ctx =>
            {
                var builder = new DbContextOptionsBuilder<ApplicationDbContext>();

                var options = builder.UseSqlServer(connectionString).Options;

                var context = new ApplicationDbContext(options);

                return context;
            })
            .AsSelf()
            .As<DbContext>() //For URF only
            .InstancePerLifetimeScope();
        }
    }
}
