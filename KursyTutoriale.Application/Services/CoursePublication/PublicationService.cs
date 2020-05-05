using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
using KursyTutoriale.Domain.Entities.CoursePreview;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.CoursePublication.Discounts;
using KursyTutoriale.Domain.Factories.CoursePublication.Discounts;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class PublicationService : IPublicationService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IExtendedRepository<CoursePreview> previewRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private ICourseRepository coursesRepository;
        private IDiscountCodeFactory discountCodeFactory;

        public PublicationService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            ICourseRepository coursesRepository,
            IExecutionContextAccessor executionContextAccessor,
            IDiscountCodeFactory discountCodeFactory, 
            IExtendedRepository<CoursePreview> previewRepository)
        {
            this.profilesRepository = profilesRepository;
            this.coursesRepository = coursesRepository;
            this.executionContextAccessor = executionContextAccessor;
            this.discountCodeFactory = discountCodeFactory;
            this.previewRepository = previewRepository;
        }

        public CourseVersion PublishCourse(Guid courseId)
        {
            if (profilesRepository.Queryable().Any(p => p.CourseId == courseId))
                throw new Exception($"Course: {courseId} already published");

            var course = coursesRepository.Find(courseId);

            if (!course.IsVerified())
                throw new Exception("Cannot publish unverified course");

            var userId = executionContextAccessor.GetUserId();

            if (!course.HasAccess(userId))
                throw new AuthenticationException();

            var newProfile = new CoursePublicationProfile(courseId, course.OwnerId, (int)(course.Price * 100));

            profilesRepository.InsertAgreggate(newProfile);

            return newProfile.GetLatestVersion();
        }

        public CourseVersion PublishNewVersion(Guid courseId, bool isMajor)
        {
            if (!profilesRepository.Queryable().Any(p => p.CourseId == courseId))
                throw new Exception($"Course: {courseId} hasnt been published");

            var profile = profilesRepository.Queryable().First(p => p.CourseId == courseId);
            var course = coursesRepository.Find(courseId);

            if (!course.IsVerified())
                throw new Exception("Cannot publish unverified course");

            var userId = executionContextAccessor.GetUserId();
            if (!course.HasAccess(userId))
                throw new UnauthorizedAccessException();

            var newVersion = profile.PublishNewMajorVersion();

            return newVersion;
        }

        public void AddPromotionCode(Guid courseId, DiscountConfigDto config)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            if (courseProfile is null)
                throw new Exception("Cannot add discount code to private course");

            var discountCode = discountCodeFactory.CreateDiscountCode(config.Code, config.Type, config.Amount);
            courseProfile.AddDiscountCode(discountCode);
        }

        public List<DiscountCodeDto> GetCourseDiscountCodes(Guid courseId)
        {
            var course = coursesRepository.Queryable().FirstOrDefault(c => c.Id == courseId);

            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            if (courseProfile is null && course.OwnerId != executionContextAccessor.GetUserId())
                throw new Exception("Cannot get codes from private course");

            var discountCodes = courseProfile?.Discounts.Select(dis => new DiscountCodeDto
            {
                Type = dis switch
                {
                    FixedDiscount _ => DiscountCodeType.Fixed,
                    PercentageDiscount _ => DiscountCodeType.Percentage,
                    FullDiscount _ => DiscountCodeType.Full,
                    _ => throw new NotImplementedException()
                },
                Amount = dis switch
                {
                    FixedDiscount d => d.Amount,
                    PercentageDiscount d => d.Percent,
                    FullDiscount _ => 0,
                    _ => 0
                },
                Value = dis.Code
            })
            ?.ToList();

            return discountCodes ?? new List<DiscountCodeDto>();
        }

        public int GetPriceWithDiscountCode(Guid courseId, string code)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            return courseProfile.GetPriceWithDiscount(code);
        }

        public void InvalidateCode(Guid courseId, string code)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            courseProfile.InvalidateCode(code);
        }

        public void AddLessonToPreview(Guid courseId, Guid lessonId)
        {
            var course = coursesRepository.Find(courseId);

            if(course is null)
                throw new Exception("Course doesnt exist");

            if(!course.Lessons.Any(lesson => lesson.Id == lessonId))
                    throw new Exception("Lesson doesnt exist");

            var preview = previewRepository
                .Queryable()
                .Include(cp => cp.LessonPreviews)
                .FirstOrDefault(cp => cp.Id == courseId);

            if (preview is null)
            {
                preview = new CoursePreview(courseId);
                preview.AddToPreview(lessonId);
                previewRepository.InsertAgreggate(preview);

                return;
            }

            preview.AddToPreview(lessonId);
        }

        public void RemoveLessonFromPreview(Guid courseId, Guid lessonId)
        {
            var preview = previewRepository
                .Queryable()
                .Include(cp => cp.LessonPreviews)
                .FirstOrDefault(cp => cp.Id == courseId);

            if (preview is null)
                throw new Exception("Course doesnt have preview");

            preview.RemoveFromPreview(lessonId);
        }
    }
}
