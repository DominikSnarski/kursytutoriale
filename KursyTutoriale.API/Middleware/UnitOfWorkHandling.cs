using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.API.Middleware
{
    public class UnitOfWorkHandling
    {
        private readonly RequestDelegate next;
        public UnitOfWorkHandling(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, IUnitOfWork unitOfWork)
        {
            await next(context);
            await unitOfWork.SaveChangesAsync();
        }
    }
}
