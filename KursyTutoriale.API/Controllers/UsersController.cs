using Microsoft.AspNetCore.Mvc;
using KursyTutoriale.Application.Services.UserProfiles;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace KursyTutoriale.API.Controllers
{
    [Authorize]
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

        [HttpGet("/GetProfilesByName")]
        public IEnumerable<UserProfileListItemDTO> GetProfilesByName(string query)
        {
            return usersService.GetProfilesByName(query);
        }

        [HttpGet("/IsEmailConfirmed")]
        public Task<bool> IsEmailConfirmed()
        {
            return usersService.IsEmailConfirmed();
        }
    }
}