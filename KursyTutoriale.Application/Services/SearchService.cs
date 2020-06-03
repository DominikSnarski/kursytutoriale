using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Domain.Entities.CoursePublication;

namespace KursyTutoriale.Application.Services
{
    public interface ISearchService
    {
        public IEnumerable<CoursePageItemDTO> Search(string phrase);
    }

    public class SearchService : ISearchService
    {
        ICourseRepository coursesRepository;
        IDTOMapper mapper;
        private IExtendedRepository<CoursePublicationProfile> publicationRepository;
        public SearchService(
            ICourseRepository coursesRepository,
            IDTOMapper mapper,
            IExtendedRepository<CoursePublicationProfile> publicationRepository)
        {
            this.coursesRepository = coursesRepository;
            this.mapper = mapper;
            this.publicationRepository = publicationRepository;
        }

        public IEnumerable<CoursePageItemDTO> Search(string phrase)
        {
            try
            {
                var courseIds = publicationRepository.Queryable()
                                    .Select(p => p.CourseId)
                                    .ToList();

                var courses = coursesRepository.Queryable()
                    .Include(c => c.Modules)
                    .Where(c => courseIds.Contains(c.Id) && 
                           (c.Title.ToUpper().Contains(phrase.ToUpper()) ||
                            c.Modules.Any(m => m.Title.ToUpper().Contains(phrase))))
                    .Include(c => c.Tags)
                        .ThenInclude(t => t.Tag)
                    .ToList();

                return mapper.Map<List<CoursePageItemDTO>>(courses);
            }
            catch (SqlException)
            {
                return new List<CoursePageItemDTO>();
            }
        }
    }
    public class SearchResult
    {
        // true if anything was found
        public bool result;
        public IEnumerable<CourseBasicInformationsDTO> foundCourses;
    }
}
