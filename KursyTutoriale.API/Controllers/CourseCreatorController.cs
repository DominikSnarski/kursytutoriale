using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entites;
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
        /// <param name="id">  Id of course you want to get </param>
        /// <returns>
        /// Returns version of course viable for edition 
        /// </returns>
        [HttpGet("GetCourseForEdition")]
        public CourseForEditionDTO GetCourseForEdition(Guid courseId)
        {
            return courseService.GetCourseForEdition(courseId);
        }
    }
}
