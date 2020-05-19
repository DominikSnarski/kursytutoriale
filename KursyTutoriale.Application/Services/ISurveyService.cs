using KursyTutoriale.Application.DataTransferObjects.Course;
using System;

namespace KursyTutoriale.Application.Services
{
    public interface ISurveyService
    {
        void AddSurvey(Guid courseId);
        SurveyDTO GetSurvey(Guid courseId);
        void UpdateSurvey(Guid courseId, SurveyDTO survey);
    }
}