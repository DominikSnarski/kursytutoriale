﻿
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services
{
    public interface ICourseService
    {
        CourseDetailsDTO GetCourseDetails(Guid courseId);
        CourseModuleDetailsDTO GetCourseModuleDetails(Guid courseId, int moduleIndex);
        LessonDetailsDTO GetLessonDetails(Guid courseId, int moduleIndex, int lessonIndex);
        List<CourseBasicInformationsDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize);
        Task<int> AddCourse(CourseCreationDTO course);
        Task<int> AddModule(CourseModuleCreationDTO module);
        Task<int> AddLesson(LessonCreationDTO lesson);
        Task<int> AddTag(TagCreationDTO tag);
        CourseForEditionDTO GetCourseForEdition(Guid courseId);
        int GetNumberOfCourses();
        LessonForEditionDTO GetLessonForEdition(Guid courseId, int moduleIndex, int lessonIndex);
        CourseModuleForEditionDTO GetCourseModuleForEdition(Guid courseId, int moduleIndex);
        List<CourseBasicInformationsDTO> GetPagesOfCoursesFiltered(int firstPageNumber, int lastPageNumber, int pageSize,
            bool isDescending, float lowestPrice, float highestPrice, ICollection<Guid> tags);
        FeaturedCoursesDTO getFeaturesCourses(int numberInEachCategory);
        Course GetCourse(Guid id);

    }

    public class CourseService : ICourseService
    {
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private ICoursesRepository coursesRepository;
        public CourseService(
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            ICoursesRepository coursesRepository)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.coursesRepository = coursesRepository;
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
            var query = coursesRepository.Queryable();
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
            var query = coursesRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault().Modules.Where(m => m.Index == moduleIndex).FirstOrDefault();
                if (result != null)
                    return mapper.Map<CourseModuleDetailsDTO>(result);
                else throw new Exception("Error 1004! GetCourseModuleDetails service returned null");

            }
            else throw new Exception("Error 1005! GetCourseModuleDetails service returned null");
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
        public LessonDetailsDTO GetLessonDetails(Guid courseId, int moduleIndex, int lessonIndex)
        {
            var query = coursesRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault()
                    .Modules.Where(m => m.Index == moduleIndex).FirstOrDefault()
                    .Lessons.Where(l => l.Index.Equals(lessonIndex)).FirstOrDefault();
                if (result != null)
                    return mapper.Map<LessonDetailsDTO>(result);
                else throw new Exception("Error 1006! GetLessonDetails service returned null");

            }
            else throw new Exception("Error 1007! GetLessonDetails service returned null");
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
            var query = coursesRepository.Queryable();
            query = query.Skip(firstPageNumber * pageSize).Take(pageSize * (lastPageNumber - firstPageNumber + 1));
            var queryList = query.ToList();
            List<CourseBasicInformationsDTO> list = new List<CourseBasicInformationsDTO>();
            foreach (Course c in queryList)
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
        /// <param name="highestPrice"> Highest price accepted in filter. If you don't want to limit range by highest price put negative number otherwise 
        /// if you dont put anything it will be counted as highestPrice = 0</param>
        /// <param name="tags"> Indicates tags that must be in course to be included in list</param>
        /// <returns>
        /// Returns pages from firstPageNumber to lastPageNumber.
        /// If for exemple firstPageNumber=1 and lastPageNumber=3, it will return courses from first page to third page.
        /// </returns>
        public List<CourseBasicInformationsDTO> GetPagesOfCoursesFiltered(int firstPageNumber, int lastPageNumber, int pageSize,
            bool isDescending, float lowestPrice, float highestPrice, ICollection<Guid> tags)
        {
            var query = coursesRepository.Queryable();


            if(tags.Count > 0)
                foreach (Guid id in tags)
                    query = query.Where(c => c.Tags.Any(t => t.Id.Equals(id)));

            if (lowestPrice < 0) lowestPrice = 0;

            if (highestPrice < 0)
                query = query.Where(c => c.Price >= lowestPrice); 
            else
                query = query.Where(c => c.Price >= lowestPrice && c.Price <= highestPrice);

            query = query.Skip(firstPageNumber * pageSize).Take(pageSize * (lastPageNumber - firstPageNumber + 1));
            if (isDescending) query = query.OrderByDescending(c => c.Price);
            else query = query.OrderBy(c => c.Price);
            var queryList = query.ToList();
            List<CourseBasicInformationsDTO> list = new List<CourseBasicInformationsDTO>();
            foreach (Course c in queryList)
            {
                list.Add(mapper.Map<CourseBasicInformationsDTO>(c));
            }
            return list;
        }


        /// <summary>
        /// Used to create course.
        /// </summary>
        /// <param name="course">
        /// Version of course you want to add to database.
        /// </param>
        public async Task<int> AddCourse(CourseCreationDTO course)
        {
            var c = new Course()
            {
                Date = course.Date,
                Description = course.Description,
                OwnerId = course.OwnerId,
                Price = course.Price,
                Title = course.Title
            };
            coursesRepository.InsertAgreggate(c);
            var result =  await unitOfWork.SaveChangesAsync();
            return result;

        }

        /// <summary>
        /// Used to add module to course.
        /// </summary>
        /// <param name="module">
        /// Version of module you want to add to course
        /// </param>
        public async Task<int> AddModule(CourseModuleCreationDTO module)
        {
            var query = coursesRepository.Queryable();
            var course = query.Where(c => c.Id.Equals(module.CourseId)).FirstOrDefault();

            var m = new CourseModule()
            {
               CourseId = module.CourseId,
               Index = module.Index,
               Title = module.Title
            };

            course.Modules.Add(m);
            coursesRepository.Update(course);
            var result = await unitOfWork.SaveChangesAsync();
            return result;


        }

        /// <summary>
        /// Used to add lesson to course module
        /// </summary>
        /// <param name="lesson">
        /// Version of lesson you want to add to module
        /// </param>
        public async Task<int> AddLesson(LessonCreationDTO lesson)
        {
            var query = coursesRepository.Queryable();
            var course = query.Where(c => c.Id.Equals(lesson.CourseId)).FirstOrDefault();

            var l = new Lesson()
            {
                Title = lesson.Title,
                Index = lesson.Index,
                Content = lesson.Content,
                CourseId = lesson.CourseId,
                CourseModuleIndex = lesson.CourseModuleIndex
            };

            course.Modules.Where(m => m.Index.Equals(lesson.CourseModuleIndex)).FirstOrDefault().Lessons.Add(l);
            coursesRepository.Update(course);
            var result = await unitOfWork.SaveChangesAsync();
            return result;


        }

        /// <summary>
        /// Used to add tag to course
        /// </summary>
        /// <param name="tag">
        /// Version of tag you want to add to course
        /// </param>
        public async Task<int> AddTag(TagCreationDTO tag)
        {
            var query = coursesRepository.Queryable();
            var course = query.Where(c => c.Id.Equals(tag.CourseId)).FirstOrDefault();

            var t = new CourseTag()
            {
                Id = tag.Id,
                CourseId = tag.CourseId
            };

            course.Tags.Add(t);
            coursesRepository.Update(course);
            var result = await unitOfWork.SaveChangesAsync();
            return result;
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
            var query = coursesRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault();
                return mapper.Map<CourseForEditionDTO>(result);
            }
            else throw new Exception("Error 1001! GetCourseForEdition service returned null");
        }

        /// <summary>
        /// Used to get course module for edition
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <returns>
        /// Returns version of module viable for edition
        /// </returns>
        public CourseModuleForEditionDTO GetCourseModuleForEdition(Guid courseId,int moduleIndex)
        {
            var query = coursesRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault().Modules.Where(m => m.Index == moduleIndex).FirstOrDefault();
                if (result != null)
                return mapper.Map<CourseModuleForEditionDTO>(result);
                else throw new Exception("Error 1002! GetCourseModuleForEdition service returned null");

            }
            else throw new Exception("Error 1003! GetCourseModuleForEdition service returned null");
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
        public LessonForEditionDTO GetLessonForEdition(Guid courseId, int moduleIndex, int lessonIndex)
        {
            var query = coursesRepository.Queryable();
            query = query.Where(q => q.Id.Equals(courseId));
            if (query != null)
            {
                var result = query.FirstOrDefault()
                    .Modules.Where(m => m.Index == moduleIndex).FirstOrDefault()
                    .Lessons.Where(l => l.Index.Equals(lessonIndex)).FirstOrDefault();
                if (result != null)
                    return mapper.Map<LessonForEditionDTO>(result);
                else throw new Exception("Error 1002! GetCourseModuleForEdition service returned null");

            }
            else throw new Exception("Error 1003! GetCourseModuleForEdition service returned null");
        }

        /// <summary>
        /// Used to get number of courses
        /// </summary>
        /// <returns>
        /// Returns number of courses
        /// </returns>
        public int GetNumberOfCourses()
        {
            var query = coursesRepository.Queryable();
            return query.Count();
        }

        /// <summary>
        /// Used to get entire course! Only for testing purpouses
        /// </summary>
        /// <returns>
        /// Returns course
        /// </returns>
        public Course GetCourse(Guid id)
        {
            var query = coursesRepository.Queryable().Where(c => c.Id.Equals(id)).FirstOrDefault();
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
            var query = coursesRepository.Queryable();
            if(query.Count() < numberInEachCategory) return null;
            FeaturedCoursesDTO featuredCourses = new FeaturedCoursesDTO();

            List<CourseBasicInformationsDTO> newPopular = new List<CourseBasicInformationsDTO>();
            foreach(Course course in query
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
            foreach (Course course in query
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
            foreach (Course course in query
                .OrderByDescending(course => course.Popularity)
                .ThenBy(course => course.Rating)
                .Take(numberInEachCategory))
            {
                nowPopular.Add(mapper.Map<CourseBasicInformationsDTO>(course));
            }
            featuredCourses.NowPopular = nowPopular;

            List<CourseBasicInformationsDTO> discover = new List<CourseBasicInformationsDTO>();
            foreach (Course course in query
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
    }
}
