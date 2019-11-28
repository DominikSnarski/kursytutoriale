using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Infrastructure.Configuration.DataModels;
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
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserProfileConfiguration());
            builder.ApplyConfiguration(new TagConfiguration());
        }
    }
}
