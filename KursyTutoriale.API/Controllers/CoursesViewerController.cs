
using KursyTutoriale.API.Models.Publication;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entities.Course;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        [ProducesResponseType(200, Type = typeof(CourseDetailsDTO))]
        public IActionResult GetCourseDetails(Guid courseId)
        {
            try
            {
                return Ok(courseService.GetCourseDetails(courseId));
            }
            catch(NullReferenceException)
            {
                return NoContent();
            }
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
        public List<CoursePageItemDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize)
        {
            return courseService.GetPublicCoursesPaged(firstPageNumber, lastPageNumber, pageSize);
        }

        /// <summary>
        /// Return pages of courses, as a list of courses.
        /// </summary>
        /// <param name="firstPageNumber"> Indicates with page is first in range</param>
        /// <param name="lastPageNumber"> Indicates with page is last in range</param>
        /// <param name="pageSize"> Indicates how many courses is on page</param>
        /// <param name="isDescending"> Indicates if returned list should be in descending(if true) or ascending(if false) order</param>
        /// <param name="lowestPrice"> Lowest price accepted in filter</param>
        /// <param name="highestPrice"> Highest price accepted in filter.</param>
        /// <param name="tags"> Indicates tags that must be in course to be included in list</param>
        /// <returns>
        /// Returns pages from firstPageNumber to lastPageNumber.
        /// If for exemple firstPageNumber=1 and lastPageNumber=3, it will return courses from first page to third page.
        /// </returns>
        [HttpGet("GetPagesOfCoursesFiltered")]
        public List<CourseBasicInformationsDTO> GetPagesOfCoursesFiltered(int firstPageNumber, int lastPageNumber, int pageSize,
            bool isDescending, float lowestPrice, float ?highestPrice, ICollection<Guid> tags)
        {
            return courseService.GetPagesOfCoursesFiltered(firstPageNumber, lastPageNumber, pageSize, isDescending, lowestPrice, highestPrice,tags);
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
        public CourseReadModel GetCourses(Guid id)
        {
            return courseService.GetCourse(id);
        }

        /// <summary>
        /// Gets the featured courses, it contains: Recently Updated, New Popular, Now Popular, Discover
        /// </summary>
        /// <param name="numberInEachCathegory">number of featured courses in each cathegory</param>
        /// <returns>An object containing the lists of </returns>
        [HttpGet("GetFeaturedCourses")]
        public FeaturedCoursesDTO GetFeaturedCourses([FromBody]FeaturedCoursesRequest request)
        {
            return courseService.GetFeaturedCourses(request.CategoryCount);
        }

        /// <summary>
        /// Gets the list of user's created courses
        /// </summary>
        /// <returns>The list of a use's created courses</returns>
        [HttpGet("GetUsersCourses")]
        public IEnumerable<CourseBasicInformationsDTO> GetUsersCourses(Guid UserId)
        {
            return courseService.GetUsersCourses(UserId);
        }

        [Authorize]
        [HttpPost("AddRating")]
        public async Task AddRating(Guid CourseId, Guid UserId, float Rating)
        {
          await courseService.AddRating(CourseId,UserId, Rating);
        }

        [Authorize]
        [HttpPost("IncrementViewCount")]
        public async Task IncrementViewCount(Guid CourseId)
        {
            await courseService.IncrementViewCount(CourseId);
        }

    }
}