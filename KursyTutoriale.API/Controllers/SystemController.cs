using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects.Tags;
using KursyTutoriale.Application.Services.Tags;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    /// <summary>
    /// Application related data controller( default values, settings etc.)
    /// </summary>
    [Route("api/[controller]")]
    public class SystemController : Controller
    {
        private ITagService tagService;

        public SystemController(ITagService tagService)
        {
            this.tagService = tagService;
        }

        // GET: /<controller>/
        [HttpGet("GetTags")]
        public IEnumerable<TagDTO> GetTags()
        {
            return tagService.GetAllTags();
        }
    }
}
