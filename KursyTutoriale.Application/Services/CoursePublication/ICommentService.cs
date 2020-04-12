using KursyTutoriale.Application.DataTransferObjects.NewCourse.CoursePublication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    public interface ICommentService
    {
        Task AddComment(string content, Guid courseId);
        Task EnableComments(Guid courseId, bool enable);
        List<CommentDTO> GetComments(Guid courseId);
    }
}