using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using KursyTutoriale.Application.DataTransferObjects.Course;

namespace KursyTutoriale.Application.Services
{
    public interface ISearchService
    {
        public SearchResult Search(string phrase, int totalNumberOfResults);
    }
    public class SearchResult
    {
        // true if anything was found
        public bool result;
        public IQueryable<CourseBasicInformationsDTO> foundCourses;
    }

    public class SearchService
    {
        ICoursesRepository coursesRepository;
        IDTOMapper mapper;
        public SearchService(
            ICoursesRepository coursesRepository,
            IDTOMapper mapper)
        {
            this.coursesRepository = coursesRepository;
            this.mapper = mapper;
        }

        protected class WeightDecorator
        {
            public WeightDecorator(Course course) {
                this.course = course;
                weight = 0;
            }
            public Course course;
            public double weight;
            public void AddWeight(double w) { weight += w; }
            public Course unpack() { return course; }
        }

        public SearchResult Search(string phrase, int totalNumberOfResults)
        {
            var query = coursesRepository.Queryable()
                .Where(c => c.Title.ToUpper().Contains(phrase.ToUpper()) ||
                            // check if any of the modules contain the searched phrase
                            c.Modules.TakeWhile(t => !t.Title.ToUpper().Contains(phrase.ToUpper())).Count() != c.Modules.Count());
            if (query.Count() == 0) return new SearchResult() { result = true };
            else if (totalNumberOfResults > query.Count())
                return new SearchResult()
                {
                    result = true,
                    foundCourses = mapper.MapQueryable<CourseBasicInformationsDTO, Course>(query)
                };

            List<WeightDecorator> searchList = new List<WeightDecorator>();
            foreach(Course course in query)
            {
                searchList.Add(new WeightDecorator(course));
            }
            searchList.OrderByDescending(c => c.course.Popularity)
                .ThenBy(c => c.course.Rating);
            int maxPopularity = searchList.First().course.Popularity;
            double maxRating = searchList.First().course.Rating;
            foreach(WeightDecorator item in searchList)
            {
                // add weight based on the popularity <0,15>
                item.AddWeight((item.course.Popularity / maxPopularity) * 15);
                // add weight based on the ratings <0,15>
                item.AddWeight((item.course.Rating / maxRating) * 15);
                double moduleWeight = 7f / 2;
                double lessonWeight = 7f / 4;
                if (item.course.Title.ToUpper().Contains(phrase.ToUpper()))
                    item.AddWeight(10);
                foreach(CourseModule module in item.course.Modules)
                {
                    if (module.Title.ToUpper().Contains(phrase.ToUpper()))
                        item.AddWeight(moduleWeight /= 3f/2);
                    foreach (Lesson lesson in module.Lessons)
                    {
                        if (lesson.Title.ToUpper().Contains(phrase.ToUpper()))
                            item.AddWeight(lessonWeight /= 3f/2);
                    }
                }
            }
            List<CourseBasicInformationsDTO> results = new List<CourseBasicInformationsDTO>();
            var wQuery = searchList.AsQueryable()
                            .OrderByDescending(c => c.weight)
                            .Take(totalNumberOfResults);
            foreach (WeightDecorator item in wQuery)
            {
                results.Add(mapper.Map<CourseBasicInformationsDTO>(item.unpack()));
            }
            return new SearchResult()
            {
                result = true,
                foundCourses = results.AsQueryable()
            };
        }
    }
}
