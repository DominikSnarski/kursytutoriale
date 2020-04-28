using Microsoft.AspNetCore.Builder;

namespace KursyTutoriale.API.Middleware
{
    public static class MiddlewareExtentions
    {
        public static IApplicationBuilder UseExceptionHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandling>();
        }

        public static IApplicationBuilder UseUnitOfWorkHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UnitOfWorkHandling>();
        }
    }
}
