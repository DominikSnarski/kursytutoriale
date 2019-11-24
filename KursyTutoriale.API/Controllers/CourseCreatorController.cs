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
        public void AddCourse(CourseCreationDTO course)
        {
            courseService.AddCourse(course);

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
