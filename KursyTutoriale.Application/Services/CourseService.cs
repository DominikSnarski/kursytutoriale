﻿using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Course.Events;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
        List<CoursePageItemDTO> GetPublicCoursesPaged(int firstPageNumber, int lastPageNumber, int pageSize);
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
        Task EditLesson(ChangeLessonDTO dto);
        Task EditModule(ChangeModuleDTO dto);
        Task AddRating(Guid CourseId, Guid UserId, float rating);
        Task IncrementViewCount(Guid CourseId);

    }

    public class CourseService : ICourseService
    {
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private ICourseRepository courseRepository;
        private IExtendedRepository<CoursePublicationProfile> publicationRepository;
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<Rate> rateRepository;

        public CourseService(
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            IExecutionContextAccessor executionContext,
            ICourseRepository courseRepository,
            IExtendedRepository<CoursePublicationProfile> publicationRepository,
            IExtendedRepository<Rate> rateRepository)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.executionContext = executionContext;
            this.courseRepository = courseRepository;
            this.publicationRepository = publicationRepository;
            this.rateRepository = rateRepository;
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
            var result = query.FirstOrDefault(q => q.Id.Equals(courseId));

            if (result == null)
                throw new NullReferenceException("Error 1000! GetCourseDetail service returned null");

            var dto = mapper.Map<CourseDetailsDTO>(result);

            dto.Verified = result.VerificationStamp.Status == StampStatus.Verified;

            var query1 = publicationRepository
                .Queryable();

            dto.Public = query1
                .Any(pp => pp.CourseId == courseId);

            if (dto.Public)
            {
                var publication = query1.Where(pp => pp.CourseId == courseId).FirstOrDefault();
                dto.Rating = publication.Rating;
                dto.Popularity = publication.Popularity;
            }

            return dto;
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
        public List<CoursePageItemDTO> GetPublicCoursesPaged(int firstPageNumber, int lastPageNumber, int pageSize)
        {
            try
            {
                var courseIds = publicationRepository.Queryable()
                                    .Skip(firstPageNumber * pageSize)
                                    .Take(pageSize * (lastPageNumber - firstPageNumber + 1))
                                    .Select(p => p.CourseId)
                                    .ToList();

                var courses = courseRepository.Queryable()
                    .Where(c => courseIds.Contains(c.Id))
                    .Include(c => c.Tags)
                    .ThenInclude(t => t.Tag)
                    .ToList();

                return mapper.Map<List<CoursePageItemDTO>>(courses);
            }
            catch(SqlException)
            {
                return new List<CoursePageItemDTO>();
            }
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

            var userId = executionContext.GetUserId();
            var @event = new CourseCreated(Guid.NewGuid(), request.Title, request.Description, userId, DateTime.UtcNow, request.Price, tagsIds);

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
            var userId = executionContext.GetUserId();
            var course = courseRepository.Find(module.CourseId);

            if (!course.HasAccess(userId))
                throw new UnauthorizedAccessException();

            var @event = new ModuleAdded(module.CourseId, module.Title, module.Description);


            if (course.Id == Guid.Empty)
                throw new Exception($"Course with id: {module.CourseId} doesnt exist");

            courseRepository.HandleEvent(@event, course);

            return await unitOfWork.SaveChangesAsync();
        }

        /// <summary>
        /// Used to add lesson to course module
        /// </summary>
        /// <param name="lesson">
        /// Version of lesson you want to add to module
        /// </param>
        public async Task<int> AddLesson(AddLessonRequest lesson)
        {
            var userId = executionContext.GetUserId();
            var course = courseRepository.Find(lesson.CourseId);

            if (!course.HasAccess(userId))
                throw new UnauthorizedAccessException();

            string partContent = JsonConvert.SerializeObject(lesson.Content[0].Content);

            var lessonParts = lesson.Content.OrderBy(part => part.Index)
                .Select(part => new LessonPart(part.Type, JsonConvert.SerializeObject(part.Content)))
                .ToList();

            var @event = new LessonAdded(0, lesson.Title, lesson.ModuleId, lesson.CourseId, lessonParts, lesson.Description);

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
                .ThenInclude(m=> m.Lessons)
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

        public async Task EditLesson(ChangeLessonDTO dto)
        {
            var course = courseRepository.Find(dto.CourseId);

            var @event = new LessonChanged(
                dto.CourseId, 
                dto.LessonId, 
                dto.Content
                    .Select(lp => new LessonPart(lp.Type, JsonConvert.SerializeObject(lp.Content)))
                    .ToList(), 
                dto.Title,
                dto.Description);

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();
        }

        public async Task EditModule(ChangeModuleDTO dto)
        {
            var course = courseRepository.Find(dto.CourseId);

            var @event = new ModuleChanged(
                dto.CourseId,
                dto.Title,
                dto.Description,
                dto.ModuleId);

            courseRepository.HandleEvent(@event, course);
            await unitOfWork.SaveChangesAsync();
        }
        public async Task AddRating(Guid CourseId, Guid UserId, float rating)
        {
            var query = rateRepository.Queryable();
            var rate = query.Where(r => r.CourseId == CourseId && r.UserId == UserId).FirstOrDefault();

            if (rate != null)
            {
                rate.Rating = rating;
            }
            else
            {
                Rate r = new Rate()
                {
                    CourseId = CourseId,
                    UserId = UserId,
                    Rating = rating
                };
                rateRepository.Insert(r);
            }
            await unitOfWork.SaveChangesAsync();

                var newRating = query.Where(r => r.CourseId == CourseId).Average(r => r.Rating);

                var query1 = publicationRepository.Queryable();
                var course = query1.Where(c => c.CourseId == CourseId).FirstOrDefault();
                if (course != null)
                {
                 course.Rating = newRating;
                }
                await unitOfWork.SaveChangesAsync();
            
        }

        public async Task IncrementViewCount(Guid CourseId)
        {

            var query = publicationRepository.Queryable();
            var course = query.Where(c => c.CourseId == CourseId).FirstOrDefault();
            if(course != null)
            {
                course.Popularity++;
            }
            await unitOfWork.SaveChangesAsync();
        }

    }
}
