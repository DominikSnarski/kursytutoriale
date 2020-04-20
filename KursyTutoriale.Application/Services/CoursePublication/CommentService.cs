using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CoursePublication;
using KursyTutoriale.Application.Services.Utility;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class CommentService : ICommentService
    {
        private IExecutionContextAccessor executionContextAccessor;
        private ITimeZoneService timeZoneService;
        private IExtendedRepository<CoursePublicationProfile> profileRepository;
        private IUnitOfWork unitOfWork;
        private IExtendedRepository<UserProfile> userProfileRepository;

        public CommentService(
            IExecutionContextAccessor executionContextAccessor,
            ITimeZoneService timeZoneService,
            IExtendedRepository<CoursePublicationProfile> profileRepository,
            IUnitOfWork unitOfWork,
            IExtendedRepository<UserProfile> userProfileRepository)
        {
            this.executionContextAccessor = executionContextAccessor;
            this.timeZoneService = timeZoneService;
            this.profileRepository = profileRepository;
            this.unitOfWork = unitOfWork;
            this.userProfileRepository = userProfileRepository;
        }

        public async Task AddComment(string content, Guid courseId)
        {
            var userId = executionContextAccessor.GetUserId();

            var courseProfile = profileRepository.Queryable().FirstOrDefault(x => x.CourseId == courseId);

            if (courseProfile is null)
                throw new InvalidStateException("Course doesnt exists");

            var comment = new Comment(userId, content, timeZoneService.GetCurrentTimeUtc());

            courseProfile.AddComment(comment);

            await unitOfWork.SaveChangesAsync();
        }

        public async Task EnableComments(Guid courseId, bool enable)
        {
            var userId = executionContextAccessor.GetUserId();

            var courseProfile = profileRepository.Queryable().FirstOrDefault(x => x.CourseId == courseId);

            if (courseProfile is null)
                throw new InvalidStateException("Course is not public");

            if (courseProfile.OwnerId != userId)
                throw new AuthenticationException("You dont have permition to edit this course");

            if (enable)
                courseProfile.EnableComments();
            else
                courseProfile.DisableComments();

            await unitOfWork.SaveChangesAsync();
        }

        public List<CommentDTO> GetComments(Guid courseId)
        {
            var courseProfile = profileRepository.Queryable().FirstOrDefault(x => x.CourseId == courseId);

            if (courseProfile is null)
                throw new InvalidStateException("Course is not public");

            var comments = courseProfile.Comments;

            var userIds = comments.Select(c => c.UserId);

            var usernamePairs = userProfileRepository
                .Queryable()
                .Where(up => userIds.Contains(up.Id))
                .Select(up => new { up.Id, up.Username })
                .ToList();

            var commentsDtos = comments
                .Select(c => new CommentDTO
                {
                    Content = c.Content,
                    InsertDate = c.InsertDate,
                    Username = usernamePairs.FirstOrDefault(u => u.Id == c.UserId).Username
                })
                .ToList();

            return commentsDtos;
        }
    }
}
