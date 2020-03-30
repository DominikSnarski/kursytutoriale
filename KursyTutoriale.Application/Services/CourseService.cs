
using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Verification;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Course.Events;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Infrastructure.Services;
using KursyTutoriale.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services
{
    public interface ICourseService
    {
        CourseDetailsDTO GetCourseDetails(Guid courseId);
        CourseModuleDetailsDTO GetCourseModuleDetails(Guid courseId, int moduleIndex);
        List<CourseBasicInformationsDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize);
        Task<Guid> AddCourse(CourseCreationDTO course);
        Task<int> AddModule(CourseModuleCreationDTO module);
        Task<int> AddLesson(AddLessonRequest lesson);
        CourseForEditionDTO GetCourseForEdition(Guid courseId);
        int GetNumberOfCourses();
        List<CourseBasicInformationsDTO> GetPagesOfCoursesFiltered(int firstPageNumber, int lastPageNumber, int pageSize,
            bool isDescending, float lowestPrice, float ?highestPrice, ICollection<Guid> tags);
        FeaturedCoursesDTO getFeaturesCourses(int numberInEachCategory);
        CourseReadModel GetCourse(Guid id);
        IEnumerable<CourseBasicInformationsDTO> GetUsersCourses(Guid UserId);
        IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses);
        Task<Guid> ReportCourse(Guid CourseId, ReportType type, string reporterComment);
    }

    public class CourseService : ICourseService
    {
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private IExtendedRepository<Tag> tagsRepository;
        private ICourseRepository courseRepository;
        private IFileService fileService;
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<Report> reportRepository;
        public CourseService(
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            IExtendedRepository<CourseReadModel> coursesRepository,
            IFileService fileService,
            IExecutionContextAccessor executionContext,
            ICourseRepository courseRepository, 
            IExtendedRepository<Tag> tagsRepository,
            IExtendedRepository<Report> reportRepository)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.fileService = fileService;
            this.executionContext = executionContext;
            this.courseRepository = courseRepository;
            this.tagsRepository = tagsRepository;
            this.reportRepository = reportRepository;
        }


        /// <summary>
        /// Used to get details of course.
        /// </summary>
        /// <param name="id"> Id of course you want to get </param>
        /// <returns>
        /// Returns details of course.
        /// </returns>
        public CourseDetailsDTO GetCourseDetails(Guid courseId)
        {
            var query = courseRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault();
                return mapper.Map<CourseDetailsDTO>(result);
                    
            }
            else throw new Exception("Error 1000! GetCourseDetail service returned null");
        }

        /// <summary>
        /// Used to get module details
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <returns>
        /// Returns module details
        /// </returns>
        public CourseModuleDetailsDTO GetCourseModuleDetails(Guid courseId, int moduleIndex)
        {
            var query = courseRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault().Modules.Where(m => m.Index == moduleIndex).FirstOrDefault();
                if (result != null)
                {
                    var course = mapper.Map<CourseModuleDetailsDTO>(result);
                    return course;
                }
                else throw new Exception("Error 1004! GetCourseModuleDetails service returned null");

            }
            else throw new Exception("Error 1005! GetCourseModuleDetails service returned null");
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
        public List<CourseBasicInformationsDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize)
        {
            var query = courseRepository.Queryable();
            query = query.Skip(firstPageNumber * pageSize).Take(pageSize * (lastPageNumber - firstPageNumber + 1));
            var queryList = query.ToList();
            List<CourseBasicInformationsDTO> list = new List<CourseBasicInformationsDTO>();
            foreach (var c in queryList)
            {
                list.Add(mapper.Map<CourseBasicInformationsDTO>(c));
            }
            return list;
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
        public List<CourseBasicInformationsDTO> GetPagesOfCoursesFiltered(int firstPageNumber, int lastPageNumber, int pageSize,
            bool isDescending, float lowestPrice, float ?highestPrice, ICollection<Guid> tags)
        {
            //var query = coursesRepository.Queryable();

            //if(tags.Count > 0)
            //    foreach (Guid id in tags)
            //        query = query.Where(c => c.Tags.Any(t => t.Id.Equals(id)));

            //if (lowestPrice < 0) lowestPrice = 0;

            //if (highestPrice != null)
            //{
            //    if (highestPrice < 0)
            //        query = query.Where(c => c.Price >= lowestPrice);
            //    else
            //        query = query.Where(c => c.Price >= lowestPrice && c.Price <= highestPrice);
            //}else query = query.Where(c => c.Price >= lowestPrice);
            //query = query.Skip(firstPageNumber * pageSize).Take(pageSize * (lastPageNumber - firstPageNumber + 1));
            //if (isDescending) query = query.OrderByDescending(c => c.Price);
            //else query = query.OrderBy(c => c.Price);
            //var queryList = query.ToList();
            //List<CourseBasicInformationsDTO> list = new List<CourseBasicInformationsDTO>();
            //foreach (Course c in queryList)
            //{
            //    list.Add(mapper.Map<CourseBasicInformationsDTO>(c));
            //}
            //return list;
            return null;
        }


        /// <summary>
        /// Used to create course.
        /// </summary>
        /// <param name="request">
        /// Version of course you want to add to database.
        /// </param>
        public async Task<Guid> AddCourse(CourseCreationDTO request)
        {
            var tagsIds = request.Tags.Select(t => t.Id).ToList();
            tagsIds = tagsRepository.Queryable()
                .Where(t => tagsIds.Contains(t.Id))
                .Select(t => t.Id)
                .ToList();

            var userId = executionContext.GetUserId();
            var @event = new CourseCreated(Guid.NewGuid(), request.Title, request.Description, userId, request.Date, request.Price, tagsIds);

            var course = courseRepository.HandleEvent(@event, new Course());

            await unitOfWork.SaveChangesAsync();

            return course.Id;
        }

        /// <summary>
        /// Used to add module to course.
        /// </summary>
        /// <param name="module">
        /// Version of module you want to add to course
        /// </param>
        public async Task<int> AddModule(CourseModuleCreationDTO module)
        {
            var @event = new ModuleAdded(module.CourseId, module.Title, module.Description);

            var course = courseRepository.Find(module.CourseId);

            if (course.Id == Guid.Empty)
                throw new Exception($"Course with id: {module.CourseId} doesnt exist");

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();
            return 1;
        }

        /// <summary>
        /// Used to add lesson to course module
        /// </summary>
        /// <param name="lesson">
        /// Version of lesson you want to add to module
        /// </param>
        public async Task<int> AddLesson(AddLessonRequest lesson)
        {
            var lessonParts = lesson.Content.OrderBy(part => part.Index)
                .Select(part => new LessonPart(part.Name, part.Content))
                .ToList();

            var @event = new LessonAdded(0, 0, lesson.Title, lesson.ModuleId, lesson.CourseId, lessonParts);

            var course = courseRepository.Find(lesson.CourseId);

            if (course.Id == Guid.Empty)
                throw new Exception($"Course with id: {lesson.CourseId} doesnt exist");

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();

            return 1;
        }


        /// <summary>
        /// Used to get course you want to edit.
        /// </summary>
        /// <param name="courseId">  Id of course you want to get </param>
        /// <returns>
        /// Returns version of course viable for edition 
        /// </returns>
        public CourseForEditionDTO GetCourseForEdition(Guid courseId)
        {
            var query = courseRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault();
                return mapper.Map<CourseForEditionDTO>(result);
            }
            else throw new Exception("Error 1001! GetCourseForEdition service returned null");
        }

        /// <summary>
        /// Used to get number of courses
        /// </summary>
        /// <returns>
        /// Returns number of courses
        /// </returns>
        public int GetNumberOfCourses()
        {
            var query = courseRepository.Queryable();
            return query.Count();
        }

        /// <summary>
        /// Used to get entire course! Only for testing purpouses
        /// </summary>
        /// <returns>
        /// Returns course
        /// </returns>
        public CourseReadModel GetCourse(Guid id)
        {
            var query = courseRepository.Queryable()
                .Include(c => c.Modules)
                .ThenInclude(m=>m.Lessons)
                .Where(c => c.Id.Equals(id))
                .FirstOrDefault();
            return query;
        }

        /// <summary>
        /// Used to get the featured courses, contains: Recently Updated, New Popular, Now Popular, Discover
        /// </summary>
        /// <param name="numberInEachCategory">a number of courses in each cathegory</param>
        /// <returns>
        /// the object containing the lists of featured courses
        /// </returns>
        public FeaturedCoursesDTO getFeaturesCourses(int numberInEachCategory)
        {
            // number of days for a course to be published in to still be relevant in the context of this service
            int daysRelevant = 7;
            var query = courseRepository.Queryable();
            if(query.Count() < numberInEachCategory) return null;
            FeaturedCoursesDTO featuredCourses = new FeaturedCoursesDTO();

            List<CourseBasicInformationsDTO> newPopular = new List<CourseBasicInformationsDTO>();
            foreach(var course in query
            //Take all courses that have been realesed in the relevant period of days
                .Where(course => DateTime.Compare(course.Date.AddDays(daysRelevant), DateTime.Today) >= 0)
                .OrderByDescending(course => course.Popularity)
                .ThenBy(course => course.Rating)
                .Take(numberInEachCategory))
            {
                newPopular.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            featuredCourses.NewPopular = newPopular;

            List<CourseBasicInformationsDTO> recentlyUpdated = new List<CourseBasicInformationsDTO>();
            foreach (var course in query
            //Take all courses that's last edit have had happened in the last relevant period of days
                .Where(course => DateTime.Compare(course.Date.AddDays(daysRelevant), DateTime.Today) <= 0 &&
                DateTime.Compare(course.DateOfLastEdit.AddDays(daysRelevant), DateTime.Today) >= 0)
                .OrderByDescending(course => course.Popularity)
                .ThenBy(course => course.Rating)
                .Take(numberInEachCategory))
            {
                recentlyUpdated.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            featuredCourses.RecentlyUpdated = recentlyUpdated;

            List<CourseBasicInformationsDTO> nowPopular = new List<CourseBasicInformationsDTO>();
            foreach (var course in query
                .OrderByDescending(course => course.Popularity)
                .ThenBy(course => course.Rating)
                .Take(numberInEachCategory))
            {
                nowPopular.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            featuredCourses.NowPopular = nowPopular;

            List<CourseBasicInformationsDTO> discover = new List<CourseBasicInformationsDTO>();
            foreach (var course in query
            //Take all courses that have been realesed in the relevant period of days
                .Where(course => DateTime.Compare(course.Date.AddDays(daysRelevant), DateTime.Today) >= 0)
                .OrderBy(course => course.Popularity)
                .Take(numberInEachCategory))
            {
                discover.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            featuredCourses.Discover = discover;

            return featuredCourses;
        }

        /// <summary>
        /// Gets the courses of the user
        /// </summary>
        /// <param name="UserId">ID of the user who is the owner of the courses</param>
        /// <returns>the list of user's owned courses</returns>
        public IEnumerable<CourseBasicInformationsDTO> GetUsersCourses(Guid UserId)
        {
            if (UserId == executionContext.GetUserId())
            {
                //TODO return both public and private courses
            }

            List<CourseBasicInformationsDTO> result = new List<CourseBasicInformationsDTO>();

            foreach (var course in courseRepository
                .Queryable()
                .Where(c => c.OwnerId == UserId))
            { 
                result.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }

            return result.AsEnumerable();
        }

        /// <summary>
        /// Returns the list of courses that are waiting to be verified, ordered from the oldest
        /// </summary>
        /// <param name="NrOfCourses">number of courses returned</param>
        /// <returns>List of courses waiting for verification</returns>
        public IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Creates a report for a course, takes user report it from execution context
        /// </summary>
        /// <param name="courseId">the id of the course reported</param>
        /// <param name="reporterComment">the comment left with a report by a reporter</param>
        /// <param name="type">type of a report</param>
        /// <returns>Id of the report made</returns>

        public async Task<Guid> ReportCourse(Guid courseId,ReportType type, string reporterComment)
        {
            CourseReadModel course = courseRepository.Queryable().First(c => c.Id == courseId);
            if (course == null)
            {
                throw new ArgumentException("courseId not found","courseId");
            }
            if (executionContext.GetUserId() == null)
            {
                throw new UnauthorizedAccessException();
            }
            Report report = new Report(executionContext.GetUserId(), courseId);
            report.ReportType = type;
            report.ReporterComment = reporterComment;

            reportRepository.Insert(report);
            var result = await unitOfWork.SaveChangesAsync();
            return report.Id;
        }
    }
}
