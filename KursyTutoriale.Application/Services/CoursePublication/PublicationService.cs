using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Payments;
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
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class PublicationService : IPublicationService
    {
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private ICourseRepository coursesRepository;
        private IUnitOfWork unitOfWork;
        private IDiscountCodeFactory discountCodeFactory;

        public PublicationService(
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            ICourseRepository coursesRepository,
            IUnitOfWork unitOfWork,
            IExecutionContextAccessor executionContextAccessor,
            IDiscountCodeFactory discountCodeFactory)
        {
            this.profilesRepository = profilesRepository;
            this.coursesRepository = coursesRepository;
            this.unitOfWork = unitOfWork;
            this.executionContextAccessor = executionContextAccessor;
            this.discountCodeFactory = discountCodeFactory;
        }

        public async Task<CourseVersion> PublishCourse(Guid courseId)
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

            var result = await unitOfWork.SaveChangesAsync();

            return newProfile.GetLatestVersion();
        }

        public async Task<CourseVersion> PublishNewVersion(Guid courseId, bool isMajor)
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

            await unitOfWork.SaveChangesAsync();

            return newVersion;
        }

        public async Task AddPromotionCode(Guid courseId, DiscountConfigDto config)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            if (courseProfile is null)
                throw new Exception("Cannot add discount code to private course");

            var discountCode = discountCodeFactory.CreateDiscountCode(config.Code, config.Type, config.Amount);
            courseProfile.AddDiscountCode(discountCode);

            await unitOfWork.SaveChangesAsync();
        }

        public List<DiscountCodeDto> GetCourseDiscountCodes(Guid courseId)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            if (courseProfile is null)
                throw new Exception("Cannot get codes from private course");

            var discountCodes = courseProfile.Discounts.Select(dis => new DiscountCodeDto
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
            .ToList();

            return discountCodes;
        }

        public int GetPriceWithDiscountCode(Guid courseId, string code)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            return courseProfile.GetPriceWithDiscount(code);
        }

        public async Task InvalidateCode(Guid courseId, string code)
        {
            var courseProfile = profilesRepository
                .Queryable()
                .Include(pp => pp.Discounts)
                .FirstOrDefault(profile => profile.CourseId == courseId);

            courseProfile.InvalidateCode(code);

            await unitOfWork.SaveChangesAsync();
        }
    }
}
