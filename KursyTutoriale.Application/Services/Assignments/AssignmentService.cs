using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Assignment;
using KursyTutoriale.Domain.Entities.Assignments;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;

namespace KursyTutoriale.Application.Services.Assignments
{
    class AssignmentService : IAssignmentService
    {
        private IExecutionContextAccessor executionContextAccessor;
        private IExtendedRepository<Assignment> assignmentRepository;
        private IExtendedRepository<UserProfile> userProfileRepository;
        private ICourseRepository courseRepository;

        public AssignmentService(
            IExecutionContextAccessor executionContextAccessor,
            IExtendedRepository<Assignment> assignmentRepository,
            ICourseRepository courseRepository,
            IExtendedRepository<UserProfile> userProfileRepository)
        {
            this.executionContextAccessor = executionContextAccessor;
            this.assignmentRepository = assignmentRepository;
            this.courseRepository = courseRepository;
            this.userProfileRepository = userProfileRepository;
        }

        public void SendAssignment(Guid lessonId, string content)
        {
            var userId = executionContextAccessor.GetUserId();

            var assigment = assignmentRepository.Queryable().FirstOrDefault(ass => ass.ReporterId == userId && ass.LessonId == lessonId);

            if (assigment is null)
            {
                assigment = new Assignment(userId, lessonId, content);

                assignmentRepository.Insert(assigment);
            }
            else
            {
                assigment.ChangeContent(content);
            }
        }

        public void RateAssignemt(Guid assigmentId, int rate)
        {
            var userId = executionContextAccessor.GetUserId();

            var assignment = assignmentRepository.Queryable().FirstOrDefault(a => a.Id == assigmentId);

            if(assignment is null)
                throw new Exception("Assigment doesnt exists");

            var course = courseRepository
                .Queryable()
                .FirstOrDefault(c => c.Modules.SelectMany(m => m.Lessons).Any(l => l.Id == assignment.LessonId));

            if (course is null)
                throw new Exception("Course doesnt exists");

            if (course.OwnerId != userId)
                throw new AuthenticationException("Only owner can rate assignments");

            assignment.RateAssigment(rate);
        }

        public List<AssignmentDto> GetLessonAssigments(Guid lessonId)
        {
            var userId = executionContextAccessor.GetUserId();

            return assignmentRepository.Queryable()
                .Include(ass => ass.Rate)
                .Where(ass => ass.LessonId == lessonId)
                .Select(ass => new AssignmentDto
                {
                    Content = ass.Content,
                    Rate = ass.Rate.Rate,
                    SentDate = DateTime.UtcNow,
                    ReporterUsername = userProfileRepository.Queryable().FirstOrDefault(up => up.Id == userId).Username
                })
                .ToList();
        }
    }
}
