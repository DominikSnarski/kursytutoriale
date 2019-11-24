﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesViewerController : ControllerBase
    {

        ICourseService courseService;
        public CoursesViewerController(ICourseService courseService)
        {
            this.courseService = courseService;
        }


        /// <summary>
        /// Used to get details of course.
        /// </summary>
        /// <param name="id"> Id of course you want to get </param>
        /// <returns>
        /// Returns details of course.
        /// </returns>
        [HttpGet("GetCourseDetails")]
        public CourseDetailsDTO GetCourseDetails(Guid courseId)
        {
            return courseService.GetCourseDetails(courseId);
        }

        /// <summary>
        /// Used to get module details
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <returns>
        /// Returns module details
        /// </returns>
        [HttpGet("GetCourseModuleDetails")]
        public CourseModuleDetailsDTO GetCourseModuleDetails(Guid courseId, int moduleIndex)
        {
            return courseService.GetCourseModuleDetails(courseId, moduleIndex);
        }

        /// <summary>
        /// Used to get lesson details
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <param name="lessonIndex">Index of lesson you want to get</param>
        /// <returns>
        /// Returns lesson details
        /// </returns>
        [HttpGet("GetLessonDetails")]
        public LessonDetailsDTO GetLessonDetails(Guid courseId, int moduleIndex, int lessonIndex)
        {
            return courseService.GetLessonDetails(courseId, moduleIndex, lessonIndex);
        }

        /// <summary>
        /// Return pages of courses, as a list of courses.
        /// </summary>
        /// <param name="firstPageNumber"> Indicates with page is first in range</param>
        /// <param name="lastPageNumber"> Indicates with page is last in range</param>
        /// <param name="pageSize"> Indicates how many courses is on page</param>
        /// <returns>
        /// Returns pages from firstPageNumber to lastPageNumber.
        /// If for exemple firstPageNumber=1 and lastPageNumber=3, it will return courses from first page to third page.
        /// </returns>
        [HttpGet("GetPagesOfCourses")]
        public List<CourseBasicInformationsDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize)
        {
            return courseService.GetPagesOfCourses(firstPageNumber, lastPageNumber, pageSize);
        }


        /// <summary>
        /// Used to get number of courses
        /// </summary>
        /// <returns>
        /// Returns number of courses
        /// </returns>
        [HttpGet("GetNumberOfCourses")]
        public int GetNumberOfCourses()
        {
            return courseService.GetNumberOfCourses();
        }

        /// <summary>
        /// Used to get entire course! Only for testing purpouses
        /// </summary>
        /// <returns>
        /// Returns course
        /// </returns>
        [HttpGet("GetCourse")]
        public Course GetCourses(int id)
        {
            return courseService.GetCourse(id);
        }


    }
}