using KursyTutoriale.Application.DataTransferObjects.Assignment;
using System;
using System.Collections.Generic;

namespace KursyTutoriale.Application.Services.Assignments
{
    public interface IAssignmentService
    {
        List<AssignmentDto> GetLessonAssigments(Guid lessonId);
        void RateAssignemt(Guid assigmentId, int rate);
        void SendAssignment(Guid lessonId, string content);
    }
}