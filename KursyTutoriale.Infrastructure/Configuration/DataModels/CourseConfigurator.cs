﻿using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    public class CourseConfigurator : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.ToTable("KTCourse");
            builder.HasKey(c => c.Id);
            builder.OwnsMany(c => c.Modules, m =>
            {
               // m.WithOwner().HasForeignKey("CourseId");
               // m.HasKey("Index");
                m.ToTable("KTCourseModule");
                m.OwnsMany(module => module.Lessons, l =>
                {
                   // l.WithOwner().HasForeignKey("Index");
                   // l.HasKey("Index");
                    l.ToTable("KTLesson");  
                });
            });
            builder.OwnsMany(c => c.Tags, t =>
            {
                t.ToTable("KTCourseTags");
            });
        }
    }
}