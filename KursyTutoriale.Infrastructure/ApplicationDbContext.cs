using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.Moderation;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Infrastructure.Configuration.DataModels;
using KursyTutoriale.Infrastructure.EventSourcing;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using KursyTutoriale.Domain.Entities.CoursePreview;
using KursyTutoriale.Domain.Entities.Assignments;

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
        public DbSet<Gender> Genders { get; set; }
        public DbSet<CourseJsonEvent> CourseEvents{ get; set; }
        public DbSet<CourseReadModel> Courses { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<CoursePublicationProfile> PublicationProfiles { get; set; }
        public DbSet<ModAssignment> ModAssignments { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<UserAccountDate> UserAccountDates { get; set; }
        public DbSet<UserSignInDate> UserSignInDates { get; set; }
        public DbSet<PaymentCustomer> PaymentCustomers { get; set; }
        public DbSet<CoursePreview> CoursePreviews { get; set; }
        public DbSet<KarmaReward> KarmaRewards { get; set; }
        public DbSet<Assignment> Assignments { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserProfileConfiguration());
            builder.ApplyConfiguration(new ModeratorProfileConfigurator());
            builder.ApplyConfiguration(new TagConfiguration());
            builder.ApplyConfiguration(new CourseConfigurator());
            builder.ApplyConfiguration(new GenderConfigurator());
            builder.ApplyConfiguration(new ReportConfiguration());
            builder.ApplyConfiguration(new CoursePublicationProfileConfiguration());
            builder.ApplyConfiguration(new ModAssignmentConfiguration());
            builder.ApplyConfiguration(new RateConfiguration());
            builder.ApplyConfiguration(new UserAccountDateConfiguration());
            builder.ApplyConfiguration(new UserSignInDateConfiguration());
            builder.ApplyConfiguration(new DiscountConfiguration());
            builder.ApplyConfiguration(new CoursePreviewConfiguration());
            builder.ApplyConfiguration(new KarmaRewardConfiguration());
            builder.ApplyConfiguration(new AssignmentConfigurator());

            builder = PaymentMethodConfiguration.Configure(builder);
        }
    }
}
