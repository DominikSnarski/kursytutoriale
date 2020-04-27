using Autofac;
using KursyTutoriale.Application.Services.Auth;
using KursyTutoriale.Domain.Factories.CoursePublication.Discounts;
using KursyTutoriale.Infrastructure.Services;
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

            builder
                .RegisterAssemblyTypes(typeof(DiscountCodeFactory).Assembly)
                .Where(c => c.Name.EndsWith("Factory"))
                .AsImplementedInterfaces();

            builder
                .RegisterAssemblyTypes(typeof(IPaymentService).Assembly)
                .Where(c => c.Name.EndsWith("Service"))
                .AsImplementedInterfaces();
        }
    }
}
