
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KursyTutoriale.Application.Services
{
    public interface ICourseService
    {
        CourseDetailsDTO GetCourseDetails(Guid courseId);
        CourseModuleDetailsDTO GetCourseModuleDetails(Guid courseId, int moduleIndex);
        LessonDetailsDTO GetLessonDetails(Guid courseId, int moduleIndex, int lessonIndex);
        List<CourseBasicInformationsDTO> GetPagesOfCourses(int firstPageNumber, int lastPageNumber, int pageSize);
        void AddCourse(CourseCreationDTO course);
        CourseForEditionDTO GetCourseForEdition(Guid courseId);
        int GetNumberOfCourses();
        LessonForEditionDTO GetLessonForEdition(Guid courseId, int moduleIndex, int lessonIndex);
        CourseModuleForEditionDTO GetCourseModuleForEdition(Guid courseId, int moduleIndex);
        Course GetCourse(int id);

    }

    public class CourseService : ICourseService
    {
        ICoursesRepository courseRepository;
        IDTOMapper mapper;
        public CourseService(
            ICoursesRepository courseRepository,
            IDTOMapper mapper)
        {
            this.courseRepository = courseRepository;
            this.mapper = mapper;
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
            var query = courseRepository.Queryable();
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
            var query = courseRepository.Queryable();
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
        /// Used to create course.
        /// </summary>
        /// <param name="course">
        /// Version of course you want to add to database.
        /// </param>
        public void AddCourse(CourseCreationDTO course)
        {
            courseRepository.Insert(mapper.Map<Course>(course));
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
        /// Used to get course module for edition
        /// </summary>
        /// <param name="courseId">Id of course you want to get</param>
        /// <param name="moduleIndex">Index of course module you want to get</param>
        /// <returns>
        /// Returns version of module viable for edition
        /// </returns>
        public CourseModuleForEditionDTO GetCourseModuleForEdition(Guid courseId,int moduleIndex)
        {
            var query = courseRepository.Queryable();
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
            var query = courseRepository.Queryable();
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
            var query = courseRepository.Queryable();
            return query.Count();
        }

        /// <summary>
        /// Used to get entire course! Only for testing purpouses
        /// </summary>
        /// <returns>
        /// Returns course
        /// </returns>
        public Course GetCourse(int id)
        {
            var query = courseRepository.Queryable().ToList();
            return query[id];
        }
    }
}
