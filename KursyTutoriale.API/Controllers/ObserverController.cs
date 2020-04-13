using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    public class ObserverController : Controller
    {
        private IObserverService observerService;

        public ObserverController(IObserverService observerService)
        {
            this.observerService = observerService;
        }

        [HttpPost("Observe")]
        public async Task Observe(Guid courseId)
        {
            await observerService.AddObserver(courseId);
        }

        [HttpDelete("Unobserve")]
        public async Task Unobserve(Guid courseId)
        {
            await observerService.RemoveObserver(courseId);
        }


        [Authorize]
        [HttpGet("IsObserving")]
        public bool IsObserving(Guid courseId)
        {
            var result = observerService.IsObserving(courseId);
            return result;
        }
    }
}
