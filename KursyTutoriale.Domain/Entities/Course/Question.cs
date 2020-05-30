using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.Course
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
        public List<SurveyAnswer> Answers { get; set; }
    }
}
