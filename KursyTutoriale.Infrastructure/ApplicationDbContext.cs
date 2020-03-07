﻿using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Moderation;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Infrastructure.Configuration.DataModels;
using KursyTutoriale.Infrastructure.EventSourcing;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace KursyTutoriale.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser,IdentityRole<Guid>,Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserProfile> UserProfiles{ get; set; }
        public DbSet<ModeratorProfile> ModeratorProfiles { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<CourseJsonEvent> CourseEvents{ get; set; }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserProfileConfiguration());
            builder.ApplyConfiguration(new ModeratorProfileConfigurator());
            builder.ApplyConfiguration(new TagConfiguration());
            builder.ApplyConfiguration(new CourseConfigurator());
            builder.ApplyConfiguration(new GenderConfigurator());
        }
    }
}
