using Autofac;
using KursyTutoriale.Application.Services.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.Configuration.DIModules
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder
                .RegisterAssemblyTypes(typeof(AuthService).Assembly)
                .Where(c => c.Name.EndsWith("Service"))
                .AsImplementedInterfaces();
        }
    }
}
