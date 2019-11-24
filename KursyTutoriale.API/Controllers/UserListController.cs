using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserListController : ControllerBase
    {
        IUserListService userListService;
        public UserListController(IUserListService userListService)
        {
            this.userListService = userListService;
        }
        /// <summary>
        /// Returns the list of app users with their basic information, best used to form a list
        /// </summary>
        /// <returns>
        /// list of app users with minimal information
        /// </returns>
        [HttpGet("GetUserList")]
        public IEnumerable<UserBasicInformationDTO> GetUserProfileList()
        {
            return userListService.GetUserList();
        }
        /// <summary>
        /// Returns the total number of app Users
        /// </summary>
        /// <returns>
        /// Total number of app Users
        /// </returns>
        [HttpGet("GetNumberOfUsers")]
        public int GetNumberOfUsers()
        {
            return userListService.GetNumberOfUsers();
        }
    }
}
