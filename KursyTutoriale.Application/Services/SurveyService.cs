using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace KursyTutoriale.Application.Services
{
    public class SurveyService : ISurveyService
    {
        private IExtendedRepository<Survey> surveyRepository;

        public SurveyService(IExtendedRepository<Survey> surveyRepository)
        {
            this.surveyRepository = surveyRepository;
        }

        public void AddSurvey(Guid courseId)
        {
            var courseSurvey = surveyRepository.Queryable().FirstOrDefault(s => s.CourseId == courseId);

            if (!(courseSurvey is null))
                throw new InvalidStateException("Cannot add more than one survey to course");

            surveyRepository.InsertAgreggate(new Survey { CourseId = courseId });
        }

        public void UpdateSurvey(Guid courseId, SurveyDTO survey)
        {
            var courseSurvey = surveyRepository
                .Queryable()
                .Include(s => s.Questions)
                .FirstOrDefault(s => s.CourseId == courseId);

            if (courseSurvey is null)
                throw new InvalidStateException("Course doesnt have survey assigned");

            courseSurvey.Questions.ForEach(q => q.IsActive = false);

            courseSurvey.Questions.AddRange( survey.Questions.Select(q => new Question
            {
                Content = q.Content,
                Answers = q.Answers.Select(a => new SurveyAnswer { Content = a }).ToList(),
                IsActive = true
            })
            .ToList());
        }


        public SurveyDTO GetSurvey(Guid courseId)
        {
            var courseSurvey = surveyRepository.Queryable().FirstOrDefault(s => s.CourseId == courseId);

            if (courseSurvey is null)
                throw new InvalidStateException("Course doesnt have survey assigned");

            return new SurveyDTO
            {
                Questions = courseSurvey.Questions.Where(q => q.IsActive).Select(q => new QuestionDTO
                {
                    Id = q.Id,
                    Answers = q.Answers.Select(a => a.Content).ToList(),
                    Content = q.Content
                }).ToList()
            };
        }
    }
}
