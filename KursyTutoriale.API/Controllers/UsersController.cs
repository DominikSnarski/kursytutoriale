using Microsoft.AspNetCore.Mvc;
using KursyTutoriale.Application.Services.UserProfiles;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet("/GetProfileById")]
        public UserProfileDTO GetProfileById(Guid id)
        {
            return usersService.GetProfile(id);
        }
    }
}