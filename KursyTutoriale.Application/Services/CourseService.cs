using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit;
using KursyTutoriale.Application.Services.CoursePublication;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Course.Events;
using KursyTutoriale.Domain.Entities.CoursePreview;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
        FeaturedCoursesDTO GetFeaturedCourses(int numberInEachCategory);
        CourseReadModel GetCourse(Guid id);
        IEnumerable<CourseBasicInformationsDTO> GetUsersCourses(Guid UserId);
        IEnumerable<CourseBasicInformationsDTO> GetCoursesForVerification(int NrOfCourses);
        Task EditLesson(ChangeLessonDTO dto);
        Task EditModule(ChangeModuleDTO dto);
        Task AddRating(Guid CourseId, Guid UserId, float rating);
        Task IncrementViewCount(Guid CourseId);

        Task SendToVerification(Guid CourseId);
        CourseDetailsDTO GetCourseDetailsProtected(Guid courseId);

    }

    public class CourseService : ICourseService
    {
        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private ICourseRepository courseRepository;
        private IExtendedRepository<CoursePublicationProfile> publicationRepository;
        private IExtendedRepository<CoursePreview> previewRepository;
        private IExecutionContextAccessor executionContext;
        private IExtendedRepository<Rate> rateRepository;
        private IExtendedRepository<Tag> tagRepository;
        private ICourseProgressService progressService;

        public CourseService(
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            IExecutionContextAccessor executionContext,
            ICourseRepository courseRepository,
            IExtendedRepository<CoursePublicationProfile> publicationRepository,
            IExtendedRepository<Rate> rateRepository,
            ICourseProgressService progressService,
            IExtendedRepository<CoursePreview> previewRepository, IExtendedRepository<Tag> tagRepository)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.executionContext = executionContext;
            this.courseRepository = courseRepository;
            this.publicationRepository = publicationRepository;
            this.rateRepository = rateRepository;
            this.progressService = progressService;
            this.previewRepository = previewRepository;
            this.tagRepository = tagRepository;
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
            var result = courseRepository.Find(courseId, DateTime.UtcNow);

            if (result == null)
                throw new NullReferenceException("Course doesnt exist");

            var courseReadModel = mapper.Map<CourseReadModel>(result);
            foreach(var c in courseReadModel.Modules
                .Zip(result.Modules, (rm, r) => new { ReadModel = rm, Result = r }))
            {
                foreach(var m in c.ReadModel.Lessons
                    .Zip(c.Result.Lessons, (rm,r) => new { ReadModel = rm, Result = r }))
                {
                    m.ReadModel.Content = JsonConvert.SerializeObject(m.Result.Content);
                }
            }

            var tags = tagRepository.Queryable().Where(t => result.Tags.ToList().Contains(t.Id)).ToList();

            courseReadModel.Tags = tags.Select(t => new CourseTag
                {
                    Tag = t
                })
                .ToList();

            var dto = mapper.Map<CourseDetailsDTO>(courseReadModel);

            dto.Verified = (int)result.VerificationStamp.Status;

            var profileQuery = publicationRepository
                .Queryable();

            dto.Public = profileQuery
                .Any(pp => pp.CourseId == courseId);

            if (dto.Public)
            {
                var publication = profileQuery.Where(pp => pp.CourseId == courseId).FirstOrDefault();
                dto.Rating = publication.Rating;
                dto.Popularity = publication.Popularity;

                int progress = progressService.GetProgress(courseReadModel, publication);

                dto.Progress = progress;

            }
            else
            {
                var userid = executionContext.GetUserId();

                if (userid == null) return new CourseDetailsDTO();

                if(!dto.OwnerId.Equals(userid))
                {
                    var roles = executionContext.GetUserRoles();
                    if(!roles.Contains("Admin")) return new CourseDetailsDTO();
                }

            }

            dto = MarkPreviewLessons(dto);

            return dto;
        }

        public CourseDetailsDTO GetCourseDetailsProtected(Guid courseId)
        {
            var result = courseRepository.Find(courseId, DateTime.UtcNow);

            if (result == null)
                throw new NullReferenceException("Course doesnt exist");

            var courseReadModel = mapper.Map<CourseReadModel>(result);
            foreach (var c in courseReadModel.Modules
                .Zip(result.Modules, (rm, r) => new { ReadModel = rm, Result = r }))
            {
                foreach (var m in c.ReadModel.Lessons
                    .Zip(c.Result.Lessons, (rm, r) => new { ReadModel = rm, Result = r }))
                {
                    m.ReadModel.Content = JsonConvert.SerializeObject(m.Result.Content);
                }
            }
            var dto = mapper.Map<CourseDetailsDTO>(courseReadModel);

            dto.Verified = (int)result.VerificationStamp.Status;

            var profileQuery = publicationRepository
                .Queryable();

            dto.Public = profileQuery
                .Any(pp => pp.CourseId == courseId);

            if (dto.Public)
            {
                var publication = profileQuery.Where(pp => pp.CourseId == courseId).FirstOrDefault();
                dto.Rating = publication.Rating;
                dto.Popularity = publication.Popularity;

                int progress = progressService.GetProgress(courseReadModel, publication);

                dto.Progress = progress;

            }

            dto = MarkPreviewLessons(dto);

            return dto;
        }

        private CourseDetailsDTO MarkPreviewLessons(CourseDetailsDTO courseDto)
        {
            var preview = previewRepository.Queryable().Include(p => p.LessonPreviews).FirstOrDefault(p => p.Id == courseDto.Id);

            if (preview is null)
                return courseDto;

            var previewLessonsIds = preview.LessonPreviews.Select(l => l.LessonId).ToList();

            courseDto.Modules.ForEach(m => 
            {
                m.Lessons.ForEach(l =>
                {
                    if (previewLessonsIds.Contains(l.Id))
                        l.IsInPreview = true;
                    else
                        l.IsInPreview = false;
                });
            });

            return courseDto;
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
            var @event = new CourseCreated(Guid.NewGuid(), request.Title, request.Description, userId, DateTime.UtcNow, request.Price, tagsIds, request.Image);

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

        public FeaturedCoursesDTO GetFeaturedCourses(int numberInEachCategory)
        {
            var topRatedCourses = GetCoursesByProfileProperty(pp => pp.Rating, false, numberInEachCategory);
            var mostPopularCourses = GetCoursesByProfileProperty(pp => pp.Popularity, false, numberInEachCategory);

            return new FeaturedCoursesDTO
            {
                TopRated = mapper.Map<List<CoursePageItemDTO>>(topRatedCourses),
                MostPopular = mapper.Map<List<CoursePageItemDTO>>(mostPopularCourses)
            };
        }

        private List<CourseReadModel> GetCoursesByProfileProperty<TProperty>(Expression<Func<CoursePublicationProfile, TProperty>> orderByProperty, bool asc, int take)
        {
            var ids = asc ?
                publicationRepository
                .Queryable()
                .OrderBy(orderByProperty)
                .Take(take)
                .Select(pp => pp.CourseId)
                .ToList() :
                publicationRepository
                .Queryable()
                .OrderByDescending(orderByProperty)
                .Take(take)
                .Select(pp => pp.CourseId)
                .ToList();

            return courseRepository
                .Queryable()
                .Where(c => ids.Contains(c.Id))
                .ToList();
        }

        /// <summary>
        /// Gets the courses of the user
        /// </summary>
        /// <param name="UserId">ID of the user who is the owner of the courses</param>
        /// <returns>the list of user's owned courses</returns>
        public IEnumerable<CourseBasicInformationsDTO> GetUsersCourses(Guid UserId)
        {
            if (executionContext.IsAuthorized && UserId == executionContext.GetUserId())
            {
                var query = courseRepository.Queryable()
                .Where(c => c.OwnerId == UserId)
                .Include(c => c.Tags)
                .ThenInclude(t => t.Tag);
                return mapper.Map<IEnumerable<CourseBasicInformationsDTO>>(query.AsEnumerable());
            }

            List<CourseBasicInformationsDTO> result = new List<CourseBasicInformationsDTO>();

            var courseIds = publicationRepository.Queryable()
                                  .Where(c=>c.OwnerId == UserId)
                                  .Select(p => p.CourseId)
                                  .ToList();

            var courses = courseRepository.Queryable()
                .Where(c => courseIds.Contains(c.Id) && c.OwnerId == UserId)
                .Include(c => c.Tags)
                .ThenInclude(t => t.Tag);

            return mapper.Map<IEnumerable<CourseBasicInformationsDTO>>(courses.AsEnumerable());
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

                var coursePublicationProfile = publicationRepository
                    .Queryable()
                    .Where(c => c.CourseId == CourseId)
                    .FirstOrDefault();

                if (coursePublicationProfile != null)
                {
                 coursePublicationProfile.Rating = newRating;
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

        public async Task SendToVerification(Guid CourseId)
        {
            var course = courseRepository.Find(CourseId);

            var @event = new VerificationChanged(CourseId, StampStatus.Pending, null, executionContext.GetUserId());

            courseRepository.HandleEvent(@event, course);

            await unitOfWork.SaveChangesAsync();
        }

    }
}
