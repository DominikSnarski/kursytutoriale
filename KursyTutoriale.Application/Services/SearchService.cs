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

namespace KursyTutoriale.Application.Services
{
    public interface ISearchService
    {
        public IEnumerable<CourseBasicInformationsDTO> Search(string phrase, int totalNumberOfResults);
    }

    public class SearchService : ISearchService
    {
        ICourseRepository coursesRepository;
        IDTOMapper mapper;
        public SearchService(
            ICourseRepository coursesRepository,
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

        public IEnumerable<CourseBasicInformationsDTO> Search(string phrase, int totalNumberOfResults)
        {
            var query = coursesRepository.Queryable()
                .Include(c => c.Modules)
                    .ThenInclude(m => m.Lessons)
                .Include(c => c.Tags)
                .Where(c => c.Title.ToUpper().Contains(phrase.ToUpper()) ||
                            // check if any of the modules contain the searched phrase
                            c.Modules.TakeWhile(t => !t.Title.ToUpper().Contains(phrase.ToUpper())).Count() != c.Modules.Count());
            if (query.Count() == 0) return null;
            else if (totalNumberOfResults > query.Count())
                return mapper.Map<IEnumerable<CourseBasicInformationsDTO>>(query.AsEnumerable());

            List<WeightDecorator> searchList = new List<WeightDecorator>();
            foreach (Course course in query)
            {
                searchList.Add(new WeightDecorator(course));
            }
            var mostPopular = searchList.OrderByDescending(c => c.course.Popularity)
                .ThenBy(c => c.course.Rating).First();
            double maxRating = mostPopular.course.Rating <= 0 ? mostPopular.course.Rating : 0.01f;
            double maxPopularity = mostPopular.course.Popularity <= 0 ? mostPopular.course.Popularity : 0.01f;
            foreach (WeightDecorator item in searchList)
            {
                // add weight based on the popularity <0,15>
                item.AddWeight((item.course.Popularity / maxPopularity) * 15);
                // add weight based on the ratings <0,15>
                item.AddWeight((item.course.Rating / maxRating) * 15);
                double moduleWeight = 7f / 2;
                double lessonWeight = 7f / 4;
                if (item.course.Title.ToUpper().Contains(phrase.ToUpper()))
                    item.AddWeight(10);
                foreach (CourseModule module in item.course.Modules)
                {
                    if (module.Title.ToUpper().Contains(phrase.ToUpper()))
                        item.AddWeight(moduleWeight /= 3f / 2);
                    foreach (Lesson lesson in module.Lessons)
                    {
                        if (lesson.Title.ToUpper().Contains(phrase.ToUpper()))
                            item.AddWeight(lessonWeight /= 3f / 2);
                    }
                }
            }
            List<CourseBasicInformationsDTO> results = new List<CourseBasicInformationsDTO>();
            foreach (WeightDecorator item in searchList
                .OrderByDescending(c => c.weight)
                .Take(totalNumberOfResults))
            {
                results.Add(mapper.Map<CourseBasicInformationsDTO>(item.unpack()));
            };
            return results.AsEnumerable();
        }
    }
    public class SearchResult
    {
        // true if anything was found
        public bool result;
        public IEnumerable<CourseBasicInformationsDTO> foundCourses;
    }
}
