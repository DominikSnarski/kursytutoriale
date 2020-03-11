﻿using KursyTutoriale.Domain.Base;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Domain.Entities.Course.Events
{
    public class CourseCreated : BaseEvent<Course>
    {
        public CourseCreated(
            Guid entityId,
            string title,
            string description,
            Guid ownerId,
            DateTime date,
            float price,
            ICollection<Guid> tags) : base(entityId)
        {
            Title = title;
            Description = description;
            OwnerId = ownerId;
            Date = date;
            Price = price;
            Tags = tags;
        }

        public string Title { get; private set; }
        public string Description { get; private set; }
        public Guid OwnerId { get; private set; }
        public DateTime Date { get; private set; }
        public float Price { get; private set; }
        public ICollection<Guid> Tags { get; private set; }

        public override Course Apply(Course entity)
        {
            entity = new Course(EntityId)
            {
                Title = Title,
                Description = Description,
                Date = Date,
                Price = Price,
                Tags = Tags,
                OwnerId = OwnerId
            };

            return entity;
        }

        public override Course Revert(Course entity)
        {
            return null;
        }
    }
}
