using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class SurveyDTO
    {
        public List<QuestionDTO> Questions { get; set; }
    }

    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public List<string> Answers { get; set; }
    }
}
