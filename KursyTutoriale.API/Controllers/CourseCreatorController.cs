using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CourseCreatorController : Controller
    {

        ICourseService courseService;
        public CourseCreatorController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        /// <summary>
        /// Used to create course.
        /// </summary>
        /// <param name="course">
        /// Version of course you want to add to database.
        /// </param>
        [HttpPost("AddCourse")]
        public async Task<Guid> AddCourse([FromBody]CourseCreationDTO course)
        {
            var id = await courseService.AddCourse(course);
            return id;
        }

        /// <summary>
        /// Used to add module to course.
        /// </summary>
        /// <param name="module">
        /// Version of module you want to add to course
        /// </param>
        [HttpPost("AddCourseModule")]
        public async Task<int> AddModule([FromBody]CourseModuleCreationDTO module)
        {
            var index = await courseService.AddModule(module);
            return index;
        }

        /// <summary>
        /// Used to add lesson to course module
        /// </summary>
        /// <param name="lesson">
        /// Version of lesson you want to add to module
        /// </param>
        [HttpPost("AddLesson")]
        public async Task<int> AddLesson([FromBody]AddLessonRequest lesson)
        {
            var index = await courseService.AddLesson(lesson);
            return index;
        }

        [HttpPost("EditLesson")]
        public async Task EditLesson([FromBody]ChangeLessonDTO lesson)
        {
            await courseService.EditLesson(lesson);
        }

        [HttpPost("EditModule")]
        public async Task EditModule([FromBody]ChangeModuleDTO module)
        {
            await courseService.EditModule(module);
        }
    }
}
