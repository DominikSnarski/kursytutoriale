﻿using AutoMapper;
using KursyTutoriale.Domain.Base;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.EventSourcing;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace KursyTutoriale.Infrastructure.Repositories.Implementations
{
    class CourseRepository : ICourseRepository
    {
        private ApplicationDbContext dbContext;
        private IMapper mapper;

        public CourseRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public Course Find(Guid id)
        {
            var course = new Course();

            if (dbContext.CourseEvents.Where(e => e.EntityId == id).Any())
                return BuildCourse(
                    dbContext.CourseEvents.Where(e => e.EntityId == id),
                    course);

            return course;
        }

        public Course Find(Guid id, DateTime stateDate)
        {
            var course = new Course();

            if (dbContext.CourseEvents.Where(e => e.EntityId == id).Any())
                return BuildCourse(
                    dbContext.CourseEvents.Where(e => e.EntityId == id && e.OccuranceDate <= stateDate),
                    course);

            return course;
        }

        public ICollection<Course> GetAll()
        {
            return BuildCourses(dbContext.CourseEvents);
        }

        public Course HandleEvent(BaseEvent<Course> @event, Course entity)
        {
            if (entity.Id == Guid.Empty)
                throw new Exception("Entity isnt tracked by persistance context");

            entity = @event.Apply(entity);

            var data = JsonConvert.SerializeObject(@event, new JsonSerializerSettings
            {
                ContractResolver = new AllPropertiesContractResolver()
            });

            var jsonEvent = new CourseJsonEvent(@event.Id, @event.OccuranceDate, data, @event.GetType().FullName, entity.Id);
            dbContext.CourseEvents.Add(jsonEvent);

            UpdateOrCreateSnapshot(entity);

            return entity;
        }

        public IQueryable<CourseReadModel> Queryable()
        {
            return dbContext.Courses;
        }

        private static Course BuildCourse(IQueryable<CourseJsonEvent> query, Course aggregate)
        {
            var aggregateEvents = query
                .OrderBy(e => e.OccuranceDate)
                .Select(e => DeserializeEvent(e))
                .ToList();

            foreach (var aggregateEvent in aggregateEvents)
                aggregate = aggregateEvent.Apply(aggregate);

            return aggregate;
        }

        private static BaseEvent<Course> DeserializeEvent(CourseJsonEvent CourseEvent)
        {
            var eventType = typeof(BaseEvent<Course>).Assembly.GetType(CourseEvent.Type);
            var concreteEvent = JsonConvert.DeserializeObject(CourseEvent.Data, eventType) as BaseEvent<Course>;

            return concreteEvent;
        }

        private static List<Course> BuildCourses(IQueryable<CourseJsonEvent> query)
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
        private void UpdateOrCreateSnapshot(Course course)
        {
            var readModel = dbContext.Courses
                .Include(c => c.Modules)
                .ThenInclude(m => m.Lessons)
                .FirstOrDefault(s => s.Id == course.Id);

            if (readModel == null)
            {
                readModel = mapper.Map<CourseReadModel>(course);

                readModel.Tags = course.Tags.Select(t => new CourseTag { CourseId = course.Id, Id = t })
                                            .ToList();

                dbContext.Courses.Add(readModel);
            }
            else
            {
                readModel.Description = course.Description;
                readModel.Date = course.Date;
                readModel.DateOfLastEdit = course.DateOfLastEdit;
                readModel.Modules = course.Modules.Select( m =>
                {
                    var module = new CourseModuleReadModel
                    {
                        Id = m.Id,
                        Description = m.Description,
                        CourseId = course.Id,
                        Index = m.Index,
                        Lessons = m.Lessons.Select(l =>
                        {
                            var lesson = new LessonReadModel
                            {
                                Id = l.Id,
                                Title = l.Title,
                                Description = l.Description,
                                Index = l.Index,
                                Content = JsonConvert.SerializeObject(l.Content,Formatting.Indented),
                                CourseId = course.Id
                            };

                            if (!dbContext.ChangeTracker.Entries<LessonReadModel>().Any(e => e.Entity.Id == lesson.Id))
                            {
                                var e = dbContext.Entry(lesson);

                                e.State = EntityState.Added;
                            }

                            return lesson;
                        })
                        .ToList(),
                        Title = m.Title
                    };

                    if (!dbContext.ChangeTracker.Entries<CourseModuleReadModel>().Any(e => e.Entity.Id == module.Id))
                    {
                        var e = dbContext.Entry(module);

                        e.State = EntityState.Added;
                    }

                    return module;
                })
                .ToList();

                readModel.Tags = course.Tags.Select(t => new CourseTag { CourseId = course.Id, Id = t })
                                           .ToList();

                readModel.VerificationStamp.Status = course.VerificationStamp.Status;
                readModel.VerificationStamp.Note = course.VerificationStamp.Note;
                readModel.VerificationStamp.ModVerifierId = course.VerificationStamp.ModVerifierId;
                readModel.VerificationStamp.Date = course.VerificationStamp.Date;
                readModel.Popularity = course.Popularity;
                readModel.Rating = course.Rating;
            }
        }


        private class AllPropertiesContractResolver : DefaultContractResolver
        {
            protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
            {
                var props = type.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance)
                    .Select(p => base.CreateProperty(p, memberSerialization))
                    .Union(type.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance)
                        .Select(f => base.CreateProperty(f, memberSerialization)))
                    .ToList();
                props.ForEach(p =>
                {
                    p.Writable = true;
                    p.Readable = true;
                });
                return props;
            }
        }
    }
}
