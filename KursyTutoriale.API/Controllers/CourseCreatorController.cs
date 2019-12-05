using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
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
        public async Task AddCourse([FromBody]CourseCreationDTO course)
        {
            var result = await courseService.AddCourse(course);

        }

        /// <summary>
        /// Used to add module to course.
        /// </summary>
        /// <param name="module">
        /// Version of module you want to add to course
        /// </param>
        [HttpPost("AddCourseModule")]
        public async Task AddModule(CourseModuleCreationDTO module)
        {
            var result = await courseService.AddModule(module);

        }

        /// <summary>
        /// Used to add lesson to course module
        /// </summary>
        /// <param name="lesson">
        /// Version of lesson you want to add to module
        /// </param>
        [HttpPost("AddLesson")]
        public async Task AddLesson(LessonCreationDTO lesson)
        {
            var result = await courseService.AddLesson(lesson);

        }

        /// <summary>
        /// Used to add tag to course
        /// </summary>
        /// <param name="tag">
        /// Version of tag you want to add to course
        /// </param>
        [HttpPost("AddTag")]
        public async Task AddTag(TagCreationDTO tag)
        {
            var result = await courseService.AddTag(tag);
        }

        /// <summary>
        /// Used to get course you want to edit.
        /// </summary>
        /// <param name="courseId">  Id of course you want to get </param>
        /// <returns>
        /// Returns version of course viable for edition 
        /// </returns>
        [HttpGet("GetCourseForEdition")]
        public CourseForEditionDTO GetCourseForEdition(Guid courseId)
        {
            return courseService.GetCourseForEdition(courseId);
        }

        /// <summary>
        /// Used to get course module for edition
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <returns>
        /// Returns version of module viable for edition
        /// </returns>
        [HttpGet("GetCourseModuleForEdition")]
        public CourseModuleForEditionDTO GetCourseModuleForEdition(Guid courseId, int moduleIndex)
        {
            return courseService.GetCourseModuleForEdition(courseId, moduleIndex);
        }

        /// <summary>
        /// Used to get lesson for edition
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <param name="lessonIndex">Index of lesson you want to get</param>
        /// <returns>
        /// Returns version of lesson viable for edition
        /// </returns>
        [HttpGet("GetLessonForEdition")]
        public LessonForEditionDTO GeLessonForEdition(Guid courseId, int moduleIndex, int lessonIndex)
        {
            return courseService.GetLessonForEdition(courseId, moduleIndex, lessonIndex);
        }
    }
}
