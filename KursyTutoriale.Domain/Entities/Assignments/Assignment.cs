using System;

namespace KursyTutoriale.Domain.Entities.Assignments
{
    public class Assignment
    {
        public Assignment(Guid reporterId, Guid lessonId, string content)
        {
            ReporterId = reporterId;
            LessonId = lessonId;
            Content = content;
        }

        public Guid Id { get; private set; }
        public Guid ReporterId { get; private set; }
        public Guid LessonId { get; private set; }
        public string Content { get; private set; }
        public AssignmentRate Rate { get; private set; }

        public void RateAssigment(int rate)
        {
            var newRate = new AssignmentRate(rate);

            Rate = newRate;
        }

        public void ChangeContent(string newContent)
        {
            Content = newContent;
        }
    }
}
