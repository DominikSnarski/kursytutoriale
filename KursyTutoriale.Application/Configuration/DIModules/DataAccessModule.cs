using Autofac;
using KursyTutoriale.Infrastructure.Repositories;

namespace KursyTutoriale.Application.Configuration.DIModules
{
    public class DataAccessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterGeneric(typeof(ExtendedRepository<>)).As(typeof(IExtendedRepository<>));
        }
    }
}
