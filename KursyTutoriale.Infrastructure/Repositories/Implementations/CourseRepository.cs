using KursyTutoriale.Domain.Base;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.EventSourcing;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Infrastructure.Repositories.Implementations
{
    class CourseRepository : ICourseRepository
    {
        private ApplicationDbContext dbContext;

        public CourseRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Course Find(Guid id)
        {
            var course = new Course(id);

            if (dbContext.CourseEvents.Where(e => e.EntityId == id).Any())
                return BuildCourse(
                    dbContext.CourseEvents.Where(e => e.EntityId == id),
                    course);

            return course;
        }

        public ICollection<Course> GetAll()
        {
            return BuildCourses(dbContext.CourseEvents);
        }

        public Course HandleEvent(BaseEvent<Course> @event, Course surplus)
        {
            throw new NotImplementedException();
        }

        private Course BuildCourse(IQueryable<CourseJsonEvent> query, Course aggregate)
        {
            var aggregateEvents = query
                .Select(e => DeserializeEvent(e))
                .ToList();

            foreach (var aggregateEvent in aggregateEvents)
                aggregate = aggregateEvent.Apply(aggregate);

            return aggregate;
        }

        private BaseEvent<Course> DeserializeEvent(CourseJsonEvent CourseEvent)
        {
            var eventType = typeof(BaseEvent<Course>).Assembly.GetType(CourseEvent.Type);
            var concreteEvent = JsonConvert.DeserializeObject(CourseEvent.Data, eventType) as BaseEvent<Course>;

            return concreteEvent;
        }

        private List<Course> BuildCourses(IQueryable<CourseJsonEvent> query)
        {
            var aggregateEventsGroups = query
               .ToLookup(e => e.EntityId, e => e)
               .ToList();

            var aggregates = aggregateEventsGroups
                .Select(eg =>
                {
                    return BuildCourse(eg.AsQueryable(), new Course(eg.Key));
                })
                .ToList();

            return aggregates;
        }
    }
}
