using KursyTutoriale.API.Models.Comments;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CoursePublication;
using KursyTutoriale.Application.Services.CoursePublication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost("AddComment")]
        public async Task AddComment([FromBody] AddCommentModel comment)
        {
           await commentService.AddComment(comment.Content, comment.CourseId);
        }

        [HttpPut("EnableComments")]
        public async Task EnableComments([FromBody] EnableCommentModel model)
        {
            await commentService.EnableComments(model.CourseId, model.Enable);
        }

        [AllowAnonymous]
        [HttpGet("GetComments")]
        public List<CommentDTO> GetComments(Guid courseId)
        {
            return commentService.GetComments(courseId);
        }
    }
}
